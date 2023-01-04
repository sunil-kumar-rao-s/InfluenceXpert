//require('dotenv').config();
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var path = require('path');
var indexRouter = require('./routes/index');
var brandsRouter = require('./routes/brandroutes');
var influencerRouter = require('./routes/influencerroutes');
var adminroutes = require('./routes/adminroutes');

const createError = require('http-errors');
const mongoose = require('mongoose');
const cors = require('cors');




var app = express();

app.use(cors())
mongoose.connect("mongodb+srv://sunil:$unil007@cluster0.7tmfndu.mongodb.net/?retryWrites=true&w=majority",{ useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, '\n connection error:'));
db.once('open', () => {console.log('db connected successfully');});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


//app


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/brands', brandsRouter);
app.use('/influencer', influencerRouter);
app.use('/admin', adminroutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
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
