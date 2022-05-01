/**
 * 二维码登录相关
 */
const { customAlphabet } = require('nanoid')
const { successResponse } = require('./utils')

const nanoid = customAlphabet('1234567890abcdef', 7)

class Docs {
  async generate(ctx) {
    ctx.body = successResponse(nanoid())
  }
}
module.exports = new Docs()
