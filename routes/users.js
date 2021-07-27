const router = require('koa-router')()
const user = require('../controller/user')

router.prefix('/users')

router.post('/login', user.login)

router.get('/register', user.login)

module.exports = router
