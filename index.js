if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const path = require('path')

app.use(express.json())
app.use(express.static('public'))

app.post('/savebuffer', (req, res) => {
  const { bufferValue, stopRecording } = req.body
  const data = { bufferValue, stopRecording }

  saveBufferValue(data)

  res.json('/savebuffer Success')
})

app.post('/savecapture', (req, res) => {
  const { captureValue } = req.body

  saveCaptureValue(captureValue)

  res.json('/savecapture Success')
})

app.get('/capture', (_, res) => {
  res.sendFile(path.join(__dirname + '/public/capture.html'))
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Started listening on port ${PORT}`)
})

const MONGO_URI = process.env.MONGO_URI
const mongoose = require('mongoose')
const Buffer = require('./models/Buffer')
const Capture = require('./models/Capture')

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error: '))
db.once('open', () => {
  console.log('DATABASE CONNECTED!')
})

async function saveBufferValue(data) {
  console.log(data)

  const req = await Buffer.findOneAndUpdate(
    {},
    {
      buffer: data.bufferValue,
      recording: !data.stopRecording,
      date: Date.now(),
    },
    { new: true }
  )

  if (!req) {
    const buffer = new Buffer({
      buffer: data.bufferValue,
      recording: !data.stopRecording,
    })

    await buffer.save((err) => {
      if (err) return console.error(err)
      console.log(buffer)
    })
  }

  console.log(req)
}

async function saveCaptureValue(captureValue) {
  console.log(captureValue)

  const req = await Capture.findOneAndUpdate(
    {},
    {
      btnPressed: captureValue,
      date: Date.now(),
    },
    { new: true }
  )

  if (!req) {
    const capture = new Capture({
      model: 'Capture',
      btnPressed: false,
    })

    await capture.save((err) => {
      if (err) return console.error(err)
      console.log(capture)
    })
  }

  console.log(req)
}
