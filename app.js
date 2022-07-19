const Koa = require('koa')
const http = require('http')
const json = require('koa-json')
const onerror = require('koa-onerror')
const koaBody = require('koa-body')
const logger = require('koa-logger')
const parameter = require('koa-parameter')
const path = require('path')
const cors = require('koa2-cors')

const initSocket = require('./controller/socket')
const config = require('./configs')
const connectDb = require('./dbs/init')

connectDb(config.dbUrl)
const routes = require('./routes')
const app = new Koa()

// error handler
onerror(app)

// middlewares
app.use(cors({
  origin: () => {
    if (process.env.npm_lifecycle_event === 'dev') {
      return '*'
    }
    return 'https://map.kimjisoo.cn'
  }
}))
app.use(koaBody({
  multipart: true,
  strict: false,
  formidable: {
    uploadDir: path.join(__dirname, 'public/upload/'), // 设置文件上传目录
    keepExtensions: true, // 保持文件的后缀
    maxFileSize: 200 * 1024 * 1024,
    // onFileBegin: (name, file) => { // 文件上传前的设置
    //   console.log(`name: ${name}`)
    //   console.log(file);
    // }
  }
}))
app.use(parameter(app))
app.use(json())
app.use(logger())
app.use(require('koa-static')(path.join(__dirname, '/public')))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

routes(app)
const server = http.createServer(app.callback())
initSocket(server)

server.listen(config.serverPort)
module.exports = app
