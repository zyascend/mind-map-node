/**
 * 测试用
 * */
const router = require('koa-router')()

router.get('/t', async ctx => {
  ctx.type = 'html';
  ctx.body = '<h1>SUCCESS!</h1>'
})

module.exports = router
