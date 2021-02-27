const mongoose = require('mongoose')

const Schema = mongoose.Schema

const captureSchema = new Schema({
  model: { type: String, default: 'Capture' },
  btnPressed: { type: Boolean, required: true },
  date: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Capture', captureSchema)
