const router = require('koa-router')()
const jwt = require('koa-jwt')
const user = require('../controller/user')
const { tokenSecret } = require('../configs')

const auth = jwt({ secret: tokenSecret })

router.prefix('/users')

router.post('/login', user.login)

router.post('/register', user.register)

router.post('/editProfile', auth, user.checkOwner, user.editProfile)

module.exports = router
