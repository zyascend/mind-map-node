const router = require('koa-router')()

router.get('/json', async ctx => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
