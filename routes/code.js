const router = require('koa-router')()
const code = require('../controller/code')

router.prefix('/code')

router.get('/generate', code.generate)
router.get('/getStatus', code.getStatus)
router.post('/setStatus', code.setStatus)
module.exports = router
