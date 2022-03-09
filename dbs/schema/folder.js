const mongoose = require('mongoose')

const { Schema, model } = mongoose

const FolderSchema = new Schema({
  name: { type: String, required: true },
  folderId: { type: String, required: true },
  userId: { type: String, required: true },
  folderType: { type: Number, required: true },
}, {
  versionKey: false,
  timestamps: {
    createdAt: 'createTime',
    updatedAt: 'updateTime'
  },
  toJSON: {
    transform: (doc, ret) => {
      return {
        ...ret,
        // eslint-disable-next-line no-underscore-dangle
        id: ret._id,
        createTime: ret.createTime.valueOf(),
        updateTime: ret.updateTime.valueOf()
      }
    }
  },
})

module.exports = model('Folder', FolderSchema)
