const DocModel = require('../dbs/schema/doc')
const DocContentModel = require('../dbs/schema/doc_content')
const FolderModel = require('../dbs/schema/folder')
const { successResponse, getDefaultDefinition, errorResponse } = require('./utils')
const QiniuClient = require('./qiniu')

const updateOption = {
  // upsert: true,
  new: true,
  // setDefaultsOnInsert: false
}
async function getNewAll(ctx) {
  const documents = await DocModel.find({ userId: ctx.state.user.id })
  const folders = await FolderModel.find({ userId: ctx.state.user.id })
  return {
    documents: documents || [],
    folders: folders || []
  }
}

class Docs {
  async getAllDocs(ctx) {
    const { latest } = ctx.request.query
    if (latest) {
      // 如果带latest参数 返回最近编辑的文档
      const documents = await DocModel.find({ userId: ctx.state.user.id })
        .limit(Number(latest)).sort({ updateTime: -1 })
      ctx.body = successResponse(documents)
    } else {
      const all = await getNewAll(ctx)
      ctx.body = successResponse(all)
    }
  }

  async getDocContent(ctx) {
    const content = await DocContentModel.findOne({ docId: ctx.params.docId })
    ctx.body = successResponse(content)
  }

  async setFolder(ctx) {
    const { id, name } = ctx.request.body
    if (id) {
      await FolderModel.findByIdAndUpdate(id, ctx.request.body, updateOption)
      const allDocs = await DocModel.find({ folderId: id })
      const allDocIds = allDocs.map(doc => doc.id)
      allDocIds.forEach(async v => {
        await DocContentModel.findOneAndUpdate({ docId: v }, {
          $set: {
            directory: [{ name, id }]
          }
        }, {
          ...updateOption,
          upsert: true
        })
      })
    } else {
      await new FolderModel(ctx.request.body).save()
    }
    const all = await getNewAll(ctx)
    ctx.body = successResponse(all)
  }

  async setDoc(ctx) {
    const { id, folderId, name } = ctx.request.body
    if (id) {
      await DocModel.findByIdAndUpdate(id, ctx.request.body, updateOption)
      await DocContentModel.findOneAndUpdate({ docId: id }, { $set: { name } }, {
        ...updateOption,
        upsert: true
      })
    } else {
      const newDoc = await new DocModel(ctx.request.body).save()
      let folderName = '我的文件'
      if (folderId !== '0') {
        const folder = await FolderModel.findOne({ _id: folderId })
        folderName = folder.name
      }
      await new DocContentModel({
        docId: newDoc.id,
        name: newDoc.name,
        role: 0,
        styles: {
          mapStyleId: 'MAPID-LogicTree',
          colorId: 'COLOR-Energy-2'
        },
        definition: getDefaultDefinition(),
        directory: [{ name: folderName, id: folderId }],
        baseVersion: '0',
      }).save()
    }
    const all = await getNewAll(ctx)
    ctx.body = successResponse(all)
  }

  async setDocContent(ctx) {
    const { docId } = ctx.request.body
    const newContent = await DocContentModel.findOneAndUpdate({ docId }, ctx.request.body, {
      ...updateOption,
      upsert: true
    })
    ctx.body = successResponse(newContent)
  }

  async uploadImg(ctx) {
    try {
      if (ctx.request.files && ctx.request.files.file) {
        const { path, name } = ctx.request.files.file
        const url = await QiniuClient.uploadFileByPath(path, name, 'pic')
        ctx.body = successResponse(url)
      }
    } catch (e) {
      ctx.body = errorResponse(e)
    }
  }

  async remove(ctx) {
    const { type, id } = ctx.request.body
    if (type === 0) {
      const { documents, folders } = await getNewAll(ctx)
      const idQueue = [id]
      const allList = [...documents, ...folders]
      const foldersToDelete = [id]
      const docToDelete = []
      while (idQueue.length) {
        const head = idQueue.pop()
        allList.forEach(v => {
          if (v.folderId === head) {
            if ('folderType' in v) {
              idQueue.push(v.id)
              foldersToDelete.push(v.id)
            } else {
              docToDelete.push(v.id)
            }
          }
        })
      }
      foldersToDelete.forEach(async v => {
        await FolderModel.remove({ _id: v })
      })
      docToDelete.forEach(async v => {
        await DocModel.remove({ _id: v })
        await DocContentModel.remove({ docId: v })
      })
    } else {
      await DocModel.remove({ _id: id })
      await DocContentModel.remove({ docId: id })
    }
    const all = await getNewAll(ctx)
    ctx.body = successResponse(all)
  }
}
module.exports = new Docs()
