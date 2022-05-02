/**
 * 二维码登录相关
 */
const jsonwebtoken = require('jsonwebtoken')
const { tokenSecret } = require('../configs')
const { customAlphabet } = require('nanoid')
const { successResponse, errorResponse } = require('./utils')
const redis = require('./redis')

const nanoid = customAlphabet('1234567890abcdef', 7)

class Docs {
  async generate(ctx) {
    const qid = nanoid()
    await redis.set(qid, JSON.stringify({ status: 'UNUSED', data: {} }))
    ctx.body = successResponse(qid)
  }

  async setStatus(ctx) {
    const { status, data, qid } = ctx.request.body
    if (status && qid) {
      let userData = data
      if (status === 'CONFIRMED') {
        const { _id } = data
        userData = {
          user: data,
          token: jsonwebtoken.sign({ id: _id }, tokenSecret, { expiresIn: '1h' })
        }
      }
      await redis.set(qid, JSON.stringify({ status, data: userData }))
      ctx.body = successResponse({ status, qid })
    } else {
      ctx.body = errorResponse('status or qid cannot be null')
    }
  }

  async getStatus(ctx) {
    const { qid } = ctx.request.query
    const [result, err] = await redis.get(qid)
    console.log(result, err)
    if (!result || err) {
      ctx.body = successResponse({ status: 'EXPIRED', data: {}, qid })
    } else {
      const { status, data } = JSON.parse(result)
      ctx.body = successResponse({ status, data, qid })
    }
  }
}
module.exports = new Docs()
