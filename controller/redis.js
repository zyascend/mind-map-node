const redis = require('redis')

class Redis {
  constructor() {
    console.log('constructor')
    this.client = redis.createClient({
      host: '127.0.0.1',
      port: '6379',
      ttl: 5 * 60 * 1000
    })
    console.log('constructor')
    this.client.on('ready', () => {
      console.log('Redis this.client: ready')
    })

    // 连接到redis-server回调事件
    this.client.on('connect', () => {
      console.log(new Date(), 'redis is now connected!')
    })

    this.client.on('reconnecting', () => {
      console.log(new Date(), 'redis reconnecting')
    })

    this.client.on('end', () => {
      console.log('Redis Closed!')
    })

    this.client.on('error', err => {
      console.log('Redis this.client: warning', err)
    })
    // this.client.send_command('config',
    //   ['set', 'notify-keyspace-events', 'Ex'], this.SubscribeExpired)
  }

  set(key, value, expire = 120) {
    return new Promise((resolve, reject) => {
      this.client.set(key, value, (err, result) => {
        console.log(key, value, err, result)
        if (err) {
          reject(err)
        }
        if (!Number.isNaN(expire) && expire > 0) {
          this.client.expire(key, expire)
        }
        resolve(result)
      })
    })
  }

  get(key) {
    return new Promise((resolve) => {
      this.client.get(key, (err, result) => {
        resolve([result, err])
      })
    })
  }

  remove(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, result) => {
        if (err) {
          reject(err)
        }
        this.client.expire(key, -1)
        resolve([result, err])
      })
    })
  }

  // SubscribeExpired(e, r) {
  //   let sub = redis.createClient(6379)
  //   const expired_subKey = '__keyevent@0__:expired'
  //   sub.subscribe(expired_subKey, function () {
  //     sub.on('message', function (chan, msg) {
  //       console.log(`二维码：${msg} 已超时过期... `)
  //       // 二维码失效，通过 BroadcastChannel 通知 routes/socket.js
  //       BroadcastChannel.SubscribeExpired.postMessage(msg)
  //     })
  //   })
  // }
}

module.exports = new Redis()
