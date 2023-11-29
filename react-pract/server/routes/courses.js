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
  console.log('Courses Route')
  try {
    connection = await Mon.connect(url)
    let db = connection.db('uvu')
    let courses = await db.collection('courses').find({}).toArray(function (err, res) {
      if (err) throw err
      return res
    })
    res.send(courses) // send the course list
    // db.close()
  } catch(err) {
    throw err
  }
})

module.exports = router