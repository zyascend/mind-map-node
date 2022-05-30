/**
 * 测试用
 * */
const router = require('koa-router')()
const styles = require('../configs/mapStyle')
const { successResponse } = require('../controller/utils')

router.get('/styles', async ctx => {
  ctx.body = successResponse(styles)
})

module.exports = router
