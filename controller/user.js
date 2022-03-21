const jsonwebtoken = require('jsonwebtoken')
const UserModel = require('../dbs/schema/user')
const { tokenSecret, defaultAvatar } = require('../configs')
const {
  errorResponse, successResponse,
  deleteFiles, getFolderPath
} = require('./utils')
const QiniuClient = require('./qiniu')

class User {
  async login(ctx) {
    // 检测参数
    ctx.verifyParams({
      email: { type: 'string', required: true },
      pwd: { type: 'string', required: true }
    })
    const user = await UserModel.findOne(ctx.request.body)
    console.log(user)
    if (!user) {
      // ctx.body = errorResponse('用户名或密码错误')
      ctx.throw(404, '用户名或密码错误')
      return
    }
    const { _id, _doc } = user
    const token = jsonwebtoken.sign({ id: _id }, tokenSecret, { expiresIn: '1h' })
    ctx.body = successResponse({ user: _doc, token })
  }

  async register(ctx) {
    ctx.verifyParams({
      email: { type: 'string', required: true },
      pwd: { type: 'string', required: true }
    })
    // 检查是否已注册
    const user = ctx.request.body
    const existedUser = await UserModel.findOne({ email: user.email })
    if (existedUser) {
      ctx.body = errorResponse('该用户已注册')
      return
    }
    user.name = user.email
    user.avatar = defaultAvatar
    const newUser = await new UserModel(ctx.request.body).save()
    const { _id, _doc } = newUser
    const token = jsonwebtoken.sign({ id: _id }, tokenSecret, { expiresIn: '1h' })
    ctx.body = successResponse({ user: _doc, token })
  }

  async editProfile(ctx) {
    try {
      const user = JSON.parse(decodeURIComponent(ctx.request.body.user))
      if (ctx.request.files && ctx.request.files.file) {
        const { path, name } = ctx.request.files.file
        user.avatar = await QiniuClient.uploadFileByPath(path, name, 'pic')
        console.log('[user.avatar]>>>>> ', user.avatar)
      }
      // eslint-disable-next-line no-underscore-dangle
      const updatedUser = await UserModel.findByIdAndUpdate(user._id, user, { new: true })
      ctx.body = successResponse(updatedUser)
      deleteFiles(getFolderPath())
    } catch (e) {
      ctx.body = errorResponse(e)
    }
  }

  async checkOwner(ctx, next) {
    console.log('checkOwner')
    console.log(ctx)
    ctx.verifyParams({
      id: { type: 'string', required: true },
    })
    const id = ctx.params.id || ctx.request.body.id
    if (id !== ctx.state.user.id) {
      ctx.throw(403)
    }
    await next()
  }

  async getUser(ctx) {
    const user = await UserModel.findById(ctx.params.id)
    if (!user) {
      ctx.throw(404, '用户不存在')
    }
    ctx.body = successResponse(user)
  }
}
module.exports = new User()
