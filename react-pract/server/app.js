require('dotenv').config()

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var indexRouter = require('./routes/index');
var coursesRouter = require('./routes/courses')
var logsRouter = require('./routes/logs')
var peopleRouter = require('./routes/people')
var createCourseRouter = require('./routes/createCourse')

// ----- DB ------
var Mon = require('mongodb').MongoClient;
var url = process.env.URL
let connection
let db
async function dbConnect() {
  try {
    connection = await Mon.connect(url)
  } catch(err) {
    throw err
  }
}
dbConnect().then(() => {
  db = connection.db('uvu')
})


// ----- SERVER ------

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/v1/courses', coursesRouter)
app.use('/api/v1/logs', logsRouter)
app.use('/api/v1/people', peopleRouter)
app.use('/api/v1/createCourse', createCourseRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
