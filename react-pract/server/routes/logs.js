var express = require('express')
var router = express.Router()

// ----- DB ------
var Mon = require('mongodb').MongoClient;
var url = process.env.URL
let connection
// let db
// async function dbConnect() {
//   try {
//     connection = await Mon.connect(url)
//   } catch(err) {
//     throw err
//   }
// }
// dbConnect().then(() => {
//   db = connection.db('uvu')
// })

router.get('/', async function(req, res, next) {
  console.log('Logs Route')
  try {
    connection = await Mon.connect(url)
    let db = connection.db('uvu')

    let cid = req.query.courseId
    let stuid = req.query.uvuId
    let logs = await db.collection(`${cid}`).find({'uvuId':stuid}).toArray(function (err, res) {
      if (err) throw err
      return res
    })
    res.send(logs) // send the course list
    // connection.close()
  } catch(err) {
    throw err
  }
})

module.exports = router