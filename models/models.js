const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bufferSchema = new Schema({
	buffer: { type: String, required: true },
	date: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Buffer', bufferSchema)
