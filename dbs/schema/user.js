const mongoose = require('mongoose')

const { Schema, model } = mongoose

const UserSchema = new Schema({
  email: { type: String, required: true },
  pwd: { type: String, required: true, select: false },
  name: { type: String, required: false },
}, { versionKey: false })

module.exports = model('User', UserSchema)
