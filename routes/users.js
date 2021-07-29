const router = require('koa-router')()
const user = require('../controller/user')

router.prefix('/users')

router.post('/login', user.login)

router.post('/register', user.register)

router.post('/editProfile', user.editProfile)

module.exports = router
