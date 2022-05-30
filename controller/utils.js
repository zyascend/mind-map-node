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

exports.getDefaultDefinition = () => {
  const content = {
    'map-root': {
      id: 'map-root',
      html: '新文档',
      children: ['n-0'],
      _children: [],
      parent: '-1',
      collapsed: false,
      markerList: ['https://cdn.kimjisoo.cn/pic/svgicons/tag-red.svg']
    },
    'n-0': {
      id: 'n-0',
      html: '子节点',
      children: [],
      _children: [],
      parent: 'map-root',
      collapsed: false,
      markerList: ['https://cdn.kimjisoo.cn/pic/svgicons/task-oct.svg', 'https://cdn.kimjisoo.cn/pic/svgicons/flag-green.svg', 'https://cdn.kimjisoo.cn/pic/svgicons/symbol-idea.svg']
    }
  }
  return JSON.stringify(content)
}
