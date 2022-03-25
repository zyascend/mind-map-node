module.exports = {
  serverPort: 3003,
  dbUrl: 'mongodb://127.0.0.1:27017/mindmap',
  tokenSecret: 'mindmap-secret-zz',
  defaultAvatar: 'https://cdn.kimjisoo.cn/pic/default.jpg',
  // ！！！【使用自己的七牛云配置，否则可能面临数据丢失的风险】！！！
  qiniuConf: {
    accessKey: 'fIQ4vN--rw7f3CzJ-sHvepWKlLZw4QF5HjUt6nYy',
    secretKey: 'LG7PAuoppjCaeQ2IGf7D8mhq3AAsKcWTPBs2_cpr',
    bucket: 'shyshyshy',
    domain: 'https://cdn.kimjisoo.cn/',
  }
}
