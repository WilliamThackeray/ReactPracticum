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

router.get('/', async function(req, res) { //get all courses
  try {
    connection = await Mon.connect(url)
    let db = connection.db('uvu')
    let stuid = req.query.uvuId
    if (stuid === undefined) {
      let courses = await db.collection('courses').find({}).toArray(function (err, res) {
        if (err) throw err
        return res
      })
      res.send(courses) // send the course list
    }
    else {
      let courses = await db.collection('courses').find({
        'students': {
          $all: [stuid]
        }
      }).toArray(function (err, res) {
        if (err) throw err
        return res
      })
      res.send(courses) // send the course list
    }
    // connection.close()
  } catch(err) {
    throw err
  }
})

router.put('/', async function(req, res) { //get all courses
  try {
    connection = await Mon.connect(url)
    let db = connection.db('uvu')
    let addStudent = req.body.studentId
    let cid = req.body.courseId
    await db.collection('courses').updateOne({ 
      id: cid, 'students': {
        $not: { 
          $all: [addStudent] }}},
    { 
      $push: { 
      students: addStudent 
    }}) //adds student id to course only if it's not already in there
    res.status(201)
    res.send()
  } catch(err) {
    throw err
  }
})


module.exports = router