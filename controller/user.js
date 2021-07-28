const UserModel = require('../dbs/schema/user')
const { errorResponse } = require('./utils')

class User {
  async login(ctx) {
    // 检测参数
    ctx.verifyParams({
      email: { type: 'string', required: true },
      pwd: { type: 'string', required: true }
    })
    const user = await UserModel.findOne(ctx.request.body)
    if (!user) {
      ctx.body = errorResponse('用户名或密码错误')
      // ctx.throw(404, '用户名或密码错误')
      return
    }
    ctx.body = {
      code: 0,
      token: 'fake token'
    }
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
      ctx.body = {
        code: -1,
        msg: '用户已注册'
      }
      return
    }
    const newUser = await new UserModel(ctx.request.body).save()
    ctx.body = {
      code: 0,
      newUser
    }
  }
}
module.exports = new User()
