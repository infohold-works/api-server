var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var index = require('./routes/index');
var api = require('./routes/api');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test')

var app = express();
var port = process.env.PORT || 3399; // set our port

app.use(morgan('dev')); // log requests to the console
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

//设置跨域访问
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.use('/', index);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace

app.listen(port);
console.log('Magic happens on port ' + port);
