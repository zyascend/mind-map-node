const jsonwebtoken = require('jsonwebtoken')
const UserModel = require('../dbs/schema/user')
const { tokenSecret } = require('../configs')
const { errorResponse } = require('./utils')

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
      ctx.body = errorResponse('用户名或密码错误')
      // ctx.throw(404, '用户名或密码错误')
      return
    }
    const { _id, email, _doc } = user
    const token = jsonwebtoken.sign({ _id, email }, tokenSecret, { expiresIn: '1h' })
    ctx.body = {
      code: 0,
      user: { ..._doc, token }
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
      ctx.body = errorResponse('该用户已注册')
      return
    }
    await new UserModel(ctx.request.body).save()
    ctx.body = {
      code: 0,
      msg: '注册成功'
    }
  }

  async editProfile(ctx) {
    ctx.verifyParams({
      _id: { type: 'string', required: true },
    })
  }
}
module.exports = new User()
