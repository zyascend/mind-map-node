const DocModel = require('../dbs/schema/doc')
const DocContentModel = require('../dbs/schema/doc_content')
const FolderModel = require('../dbs/schema/folder')
const { successResponse } = require('./utils')

const updateOption = {
  // upsert: true,
  new: true,
  // setDefaultsOnInsert: false
}
async function getNewAll(ctx) {
  console.log('getNewAll')
  console.log(ctx)
  const documents = await DocModel.find({ userId: ctx.state.user.id })
  const folders = await FolderModel.find({ userId: ctx.state.user.id })
  return {
    documents: documents || [],
    folders: folders || []
  }
}

class Docs {
  async getAllDocs(ctx) {
    const all = await getNewAll(ctx)
    ctx.body = successResponse(all)
  }

  async getDocContent(ctx) {
    console.log('getDocContent')
    console.log(ctx)
    const content = await DocContentModel.findOne({ docId: ctx.params.docId })
    ctx.body = successResponse(content)
  }

  async setFolder(ctx) {
    const { id } = ctx.request.body
    if (id) {
      await FolderModel.findByIdAndUpdate(id, ctx.request.body, updateOption)
    } else {
      await new FolderModel(ctx.request.body).save()
    }
    const all = await getNewAll(ctx)
    ctx.body = successResponse(all)
  }

  async setDoc(ctx) {
    const { id } = ctx.request.body
    if (id) {
      await DocModel.findByIdAndUpdate(id, ctx.request.body, updateOption)
    } else {
      await new DocModel(ctx.request.body).save()
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

  async remove(ctx) {
    const { type, id } = ctx.request.body
    if (type === 0) {
      await FolderModel.remove({ _id: id })
      await DocModel.remove({ folderId: id })
    } else {
      console.log(type, id)
      await DocModel.remove({ _id: id })
    }
    const all = await getNewAll(ctx)
    ctx.body = successResponse(all)
  }
}
module.exports = new Docs()
