const UserModel = require('../dbs/schema/user')
const { errorResponse } = require('./utils')

class User {
  async login(ctx) {
    // 检测参数
    ctx.verifyParams({
      email: { type: 'string', required: true },
      pwd: { type: 'string', required: true }
    })
    ctx.body = {
      code: 0,
    }
  }

  async register(ctx, next) {
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
