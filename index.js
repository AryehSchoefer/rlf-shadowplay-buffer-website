if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

const express = require('express')
const app = express()

app.use(express.json())
app.use(express.static('public'))

app.post('/savebuffer', (req, res) => {
	const { bufferValue } = req.body

	saveBufferValue(bufferValue)

	res.json('Success')
})

const PORT = 3000
app.listen(PORT, () => {
	console.log(`Started listening on port ${PORT}`)
})

const MONGO_URI = process.env.MONGO_URI
const mongoose = require('mongoose')
const Buffer = require('./models/models')

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error: '))
db.once('open', () => {
	console.log('DATABASE CONNECTED!')
})

async function saveBufferValue(bufferValue) {
	// const buffer = new Buffer({
	// 	buffer: bufferValue,
	// })

	// await buffer.save((err) => {
	// 	if (err) return console.error(err)
	// 	console.log(buffer)
	// })

	console.log(Date.now())

	const req = await Buffer.findOneAndUpdate(
		{},
		{
			buffer: bufferValue,
			date: Date.now(),
		},
		{ new: true }
	)
	console.log(req)
}
