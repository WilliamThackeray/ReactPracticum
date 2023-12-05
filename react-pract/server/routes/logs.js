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

router.get('/', async function(req, res) {
  console.log('Logs Route')
  try {
    connection = await Mon.connect(url)
    let db = connection.db('uvu')
    
    let cid = req.query.courseId
    let stuid = req.query.uvuId
    console.log('hello1')
    let logs = await db.collection(`${cid}`).find({'uvuId':stuid}).toArray(function (err, res) {
      if (err) throw err
      console.log('hello2')
      return res
    })
    res.send(logs) // send the course list
    console.log(req.query.cou)
    console.log(req.query)
    console.log(logs)
    // connection.close()
  } catch(err) {
    throw err
  }
})

module.exports = router