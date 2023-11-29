var express = require('express')
var router = express.Router()

router.get('/', function(req, res, next) {
  res.send('Courses is working properly')
})

module.exports = router