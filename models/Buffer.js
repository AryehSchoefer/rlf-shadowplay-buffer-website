const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bufferSchema = new Schema({
  model: { type: String, default: 'Buffer' },
  buffer: { type: String, required: true },
  recording: { type: Boolean, required: true },
  date: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Buffer', bufferSchema)
