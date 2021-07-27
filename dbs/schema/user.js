const mongoose = require('mongoose')

const { Schema, model } = mongoose

const UserSchema = new Schema({
  name: { type: String, required: true }
})

module.exports = model('User', UserSchema)
