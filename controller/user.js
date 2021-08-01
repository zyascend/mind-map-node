const jsonwebtoken = require('jsonwebtoken')
const UserModel = require('../dbs/schema/user')
const { tokenSecret } = require('../configs')
const { errorResponse, successResponse } = require('./utils')

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
    const { email } = ctx.request.body
    const existedUser = await UserModel.findOne({ email })
    if (existedUser) {
      ctx.body = errorResponse('该用户已注册')
      return
    }
    await new UserModel(ctx.request.body).save()
    ctx.body = successResponse()
  }

  async editProfile(ctx) {
    const { id } = ctx.request.body
    const updatedUser = await UserModel.findByIdAndUpdate(id, ctx.request.body, { new: true })
    ctx.body = successResponse(updatedUser)
  }

  async checkOwner(ctx, next) {
    ctx.verifyParams({
      id: { type: 'string', required: true },
    })
    const id = ctx.request.body.id || ctx.params.id
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
