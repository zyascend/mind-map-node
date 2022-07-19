const Koa = require('koa')

const app = new Koa()
const server = require('http').createServer(app.callback())
const io = require('socket.io')(server)
const { customAlphabet } = require('nanoid')
const redis = require('./redis')
const { successResponse } = require('./utils')
const broadcast = require('./broadcast')

const generateId = customAlphabet('1234567890abcdef', 7)

io.on('connection', socket => {
  console.log('io connected!')

  socket.on('genCode', async () => {
    // console.log('genCode!')
    const qid = generateId()
    await redis.set(qid, JSON.stringify({ status: 'UNUSED', data: {} }))
    socket.emit('sendedCode', successResponse(qid))
  })
  socket.on('checkExpired', async qid => {
    // console.log('checkExpired! > ', qid)
    const [result, err] = await redis.get(qid)
    if (!result || err) {
      socket.emit('statusChanged', successResponse({ status: 'EXPIRED', data: {}, qid }))
    }
  })
  broadcast.setCodeStatus().onmessage = async qid => {
    const [result, err] = await redis.get(qid)
    // console.log('io: setCodeStatus > ', qid, [result, err])
    let returnData
    if (!result || err) {
      returnData = successResponse({ status: 'EXPIRED', data: {}, qid })
    } else {
      const { status, data } = JSON.parse(result)
      returnData = successResponse({ status, data, qid })
    }
    socket.emit('statusChanged', returnData)
  }
  // socket.on('disconnect', () => console.log('io: web disconnected'))
})

module.exports = () => {
  server.listen(3010, () => console.log('listen socket.io on :[3010]'))
}
