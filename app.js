const Koa = require('koa')

const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const koaBody = require('koa-body')
const logger = require('koa-logger')
const parameter = require('koa-parameter')
const path = require('path')

const config = require('./configs')
const connectDb = require('./dbs/init')

connectDb(config.dbUrl)

const routes = require('./routes')

// error handler
onerror(app)

// middlewares
// app.use(bodyparser({
//   enableTypes: ['json', 'form', 'text'],
// }))
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

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
