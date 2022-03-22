const router = require('koa-router')()

router.get('/honghong', async ctx => {
  ctx.type = 'html';
  ctx.body = '<h1>TO <span style="color: red">💖HONGHONG💖</span>:</h1><img alt="lovehonghong" src="http://tva1.sinaimg.cn/large/ceeb653ely8gzygkr90qtj20hs0hsjt2.jpg" /><h3>by yangyang.</h3>'
})

module.exports = router
