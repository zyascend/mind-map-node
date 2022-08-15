const jsonwebtoken = require('jsonwebtoken')
const DocModel = require('../dbs/schema/doc')
const DocContentModel = require('../dbs/schema/doc_content')
const UserModel = require('../dbs/schema/user')
const { tokenSecret, defaultAvatar } = require('../configs')
const template = require('../configs/template.json')

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
    const { email } = ctx.request.body
    const user = await UserModel.findOne({ email })
    if (!user) {
      // ctx.body = errorResponse('用户名或密码错误')
      ctx.throw(404, '请先注册')
      return
    }
    // TODO 改为一次查询 但是需要设置user schema 的pwd select=true
    const userWithPwd = await UserModel.findOne(ctx.request.body)
    if (!userWithPwd) {
      ctx.throw(404, '密码错误')
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
    await setDefaultDoc(_id)
  }

  async editProfile(ctx) {
    try {
      const user = JSON.parse(decodeURIComponent(ctx.request.body.user))
      if (ctx.request.files && ctx.request.files.file) {
        const { path, name } = ctx.request.files.file
        user.avatar = await QiniuClient.uploadFileByPath(path, name, 'pic')
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
    ctx.verifyParams({
      id: { type: 'string', required: true },
    })
    const id = ctx.params.id || ctx.request.body.id
    const { id: tokenId, exp } = ctx.state.user
    if (Date.parse(new Date()) / 1000 > exp - 5 * 60) {
      // token过期了
      ctx.throw(401)
    }
    if (id !== tokenId) {
      // token id 和 请求id 不一致
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
async function setDefaultDoc(userId) {
  const newDoc = await new DocModel({
    name: '操作指南',
    folderId: '0',
    userId
  }).save()
  const { data } = template
  await new DocContentModel({ ...data, docId: newDoc.id }).save()
}
module.exports = new User()
