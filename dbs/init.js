const mongoose = require('mongoose')
const { resolve } = require('path')

// mongoose.Promise = global.Promise

module.exports = db => {
  let maxConnectTimes = 0

  if (process.env.NODE_ENV !== 'production') {
    mongoose.set('debug', true)
  }
  mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false
  })
  mongoose.connection.on('disconnect', () => {
    maxConnectTimes += 1

    if (maxConnectTimes < 5) {
      mongoose.connect(db)
    } else {
      throw new Error('Mongodb disconnect!')
    }
  })
  mongoose.connection.on('error', err => {
    maxConnectTimes += 1
    console.log(err)
    if (maxConnectTimes < 5) {
      mongoose.connect(db)
    } else {
      throw new Error('Mongodb error!')
    }
  })
  mongoose.connection.on('open', () => {
    // initSchemas();
    resolve()
    console.log('Mongodb connected!')
  })
}
