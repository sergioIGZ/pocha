import mongo from './mongo'
const express = require('express')
const app = express()

app.use(express.json())
app.all('/getJSON', (req, res) => {
  res.json({ data: 'data' })
})

app.get('/game', async (_, res) => {
  try {
    const pointsChart = await mongo
      .db('PochaDB')
      .collection('games')
      .find()
      .toArray()
    res.json(pointsChart)
  } catch (error) {
    console.log('ojo', error)
  }
})

app.post('/game', async (req, res) => {
  // console.log('req', req.body)
  try {
    const game = await mongo
      .db('PochaDB')
      .collection('games')
      .findOne({ gameId: req.body.gameId })

    let pointsChart = null
    if (!game) {
      pointsChart = await mongo
        .db('PochaDB')
        .collection('games')
        .insertOne(req.body)
    } else {
      res.json({ success: false, message: 'game already saved' })
    }

    res.json(pointsChart)
  } catch (error) {
    console.log('ojo', error)
  }
})

module.exports = app
