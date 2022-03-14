const mongoose = require('mongoose')

const { Schema, model } = mongoose

const DocContentSchema = new Schema({
  docId: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: Number, required: false },
  directory: { type: Array, required: false },
  definition: { type: String, required: true },
  baseVersion: { type: String, required: false },
}, { versionKey: false })

module.exports = model('DocContent', DocContentSchema)
