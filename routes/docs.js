const router = require('koa-router')()
const jwt = require('koa-jwt')
const docs = require('../controller/docs')
const user = require('../controller/user')
const { tokenSecret } = require('../configs')

const auth = jwt({ secret: tokenSecret })

router.prefix('/docs')

// router.post('/register', user.register)

router.post('/setFolder/:id', auth, user.checkOwner, docs.setFolder)
router.post('/setDoc/:id', auth, user.checkOwner, docs.setDoc)
router.post('/setDocContent/:id/', auth, user.checkOwner, docs.setDocContent)
router.get('/getAllDocs/:id', auth, user.checkOwner, docs.getAllDocs)
router.get('/getDocContent/:id/:docId', auth, user.checkOwner, docs.getDocContent)
router.post('/remove/:id', auth, user.checkOwner, docs.remove)
module.exports = router
