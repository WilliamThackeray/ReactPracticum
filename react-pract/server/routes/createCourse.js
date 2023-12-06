var express = require('express')
var router = express.Router()

// ----- DB ------
var Mon = require('mongodb').MongoClient;
var url = process.env.URL
let connection


router.post('/', async (req, res) => {
  try {
    connection = await Mon.connect(url)
    let db = connection.db('uvu')
    let newCourse = req.body
    await db.collection('courses').insertOne(newCourse)
    res.status(201)
    res.send(newCourse)
  } catch(err) {
    throw err
  }
})

module.exports = router