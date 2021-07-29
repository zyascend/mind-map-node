module.exports = {
  serverPort: 3002,
  // dbUrl: 'mongodb+srv://root:root@mindmap.3rdjx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  dbUrl: 'mongodb://127.0.0.1:27017/mindmap',
  tokenSecret: 'mindmap-secret-zz',
  qiniuConf: {
    accessKey: 'fIQ4vN--rw7f3CzJ-sHvepWKlLZw4QF5HjUt6nYy',
    secretKey: 'LG7PAuoppjCaeQ2IGf7D8mhq3AAsKcWTPBs2_cpr',
    bucket: 'shyshyshy',
    domain: 'https://qiniu.shyshyshy.icu/',
  }
}
