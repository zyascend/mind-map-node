const qiniu = require('qiniu')
const { qiniuConf } = require('../configs')

class QiniuClient {
  constructor() {
    const { accessKey, secretKey } = qiniuConf
    this.mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
    this.config = new qiniu.conf.Config()
    this.config.zone = qiniu.zone.Zone_z2
  }

  getBucketManager() {
    return new qiniu.rs.BucketManager(this.mac, this.config)
  }

  getUploadToken() {
    const options = {
      scope: qiniuConf.bucket,
    };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    return putPolicy.uploadToken(this.mac);
  }

  uploadFileByPath(filePath, fileName, cate) {
    const formUploader = new qiniu.form_up.FormUploader(this.config);
    const putExtra = new qiniu.form_up.PutExtra();
    const key = `${cate}/${new Date().getTime()}_${fileName}`;
    return new Promise((resolve, reject) => {
      formUploader.putFile(this.getUploadToken(), key, filePath, putExtra,
        (respErr, respBody, respInfo) => {
          if (respErr) {
            reject(respErr);
          }
          if (respInfo.statusCode === 200) {
            resolve(`${qiniuConf.domain}${respBody.key}`);
          } else {
            reject(respInfo.statusCode);
          }
        });
    })
  }

  fetchPhotos(cate) {
    const options = {
      // limit: 10, TODO 分页获取的实现
      prefix: `image/${cate || ''}`,
    };
    return new Promise((resolve, reject) => {
      this.getBucketManager().listPrefix(qiniuConf.bucket, options, (err, respBody, respInfo) => {
        if (err) {
          reject(err)
        }
        console.log(respInfo);
        console.log(respBody);
        if (respInfo.statusCode === 200) {
          const { items } = respBody
          const resList = []
          items.forEach(item => {
            resList.push({
              imgUrl: `${qiniuConf.domain}${item.key}`,
              createDate: item.putTime,
              cate,
              hash: item.hash,
              mimeType: item.mimeType,
            })
          });
          resolve(resList)
        } else {
          reject(respInfo.statusCode)
        }
      });
    })
  }

  addPhotosByUrl(imgUrl, cate) {
    if (!imgUrl || imgUrl.indexOf('/') < 0) return null

    const splitedUrlArray = imgUrl.split('/')
    const key = `image/${cate}/${new Date().getTime()}_${splitedUrlArray[splitedUrlArray.length - 1]}`

    console.log('key')
    console.log(key)

    return new Promise((resolve, reject) => {
      this.getBucketManager().fetch(imgUrl, qiniuConf.bucket, key, (err, respBody, respInfo) => {
        if (err) {
          reject(err)
        } else if (respInfo.statusCode === 200) {
          const resData = {
            imgUrl: `${qiniuConf.domain}${respBody.key}`,
            fsize: respBody.fsize,
            cate,
          }
          console.log(resData)
          resolve(resData)
        } else {
          reject(respInfo.statusCode);
        }
      });
    })
  }

  deletePhotosByUrl(url) {
    if (url.indexOf(qiniuConf.domain) < 0) {
      return 'key is incorrect'
    }
    const key = url.replace(qiniuConf.domain, '')

    console.log('key to delete')
    console.log(key)

    return new Promise((resolve, reject) => {
      this.getBucketManager().delete(bucket, key, (err, respBody, respInfo) => {
        if (err) {
          reject(err)
        } else if (respInfo.statusCode === 200) {
          resolve(0)
        } else {
          reject(respInfo.statusCode);
        }
      });
    })
  }
}

module.exports = new QiniuClient()
