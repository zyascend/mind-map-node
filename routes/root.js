const router = require('koa-router')()

router.get('/honghong', async ctx => {
  ctx.body = {
    letter: '爱你哟臭宝 by yangyang.'
  }
})

module.exports = router
