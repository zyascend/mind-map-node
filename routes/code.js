const router = require('koa-router')()
const code = require('../controller/code')

router.prefix('/code')

router.get('/generate', code.generate)
router.get('/getStatus', code.getStatus)
router.post('/setStatus', code.setStatus)
// router.post('/setFolder/:id', auth, user.checkOwner, docs.setFolder)
// router.post('/setDoc/:id', auth, user.checkOwner, docs.setDoc)
// router.post('/setDocContent/:id/', auth, user.checkOwner, docs.setDocContent)
// router.get('/getDocContent/:id/:docId', auth, user.checkOwner, docs.getDocContent)
// router.post('/remove/:id', auth, user.checkOwner, docs.remove)
module.exports = router
