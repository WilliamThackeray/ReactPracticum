var express = require('express')
var router = express.Router()

// ----- DB ------
var Mon = require('mongodb').MongoClient;
var url = process.env.URL
let connection

router.get('/', async function(req, res) { // get person with stuid
  try {
    connection = await Mon.connect(url)
    let db = connection.db('uvu')
    let stuid = req.query.uvuId
    if (stuid === undefined) {
      let person = await db.collection('people').find({}).toArray(function (err, res) {
        if (err) throw err
        return res
      })
      res.send(person) // send the people list
    }
    else {
      let person = await db.collection('people').find({
        number: stuid
      }).toArray(function (err, res) {
        if (err) throw err
        return res
      })
      res.send(person) // send the one people document
    }
    // connection.close()
  } catch(err) {
    throw err
  }
})

module.exports = router