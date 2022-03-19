const path = require('path')
const fs = require('fs')
const request = require('request-promise')

exports.errorResponse = msg => {
  return {
    code: -1,
    msg
  }
}

exports.successResponse = (data = {}) => {
  return {
    code: 0,
    data
  }
}
exports.deleteFiles = (folderPath) => {
  console.log('deleteFiles>', folderPath)
  const forlderExists = fs.existsSync(folderPath);
  if (forlderExists) {
    const fileList = fs.readdirSync(folderPath);
    fileList.forEach(fileName => {
      fs.unlinkSync(path.join(folderPath, fileName));
    });
  }
}

exports.request = async (options) => {
  const jsonOp = { ...options, json: true }
  try {
    return await request(jsonOp)
  } catch (err) {
    return {}
  }
}

exports.getFolderPath = () => {
  return path.join(__dirname, '../public/upload/')
}
