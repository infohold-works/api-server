var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var index = require('./routes/index');
var api = require('./routes/api');

var mongoose = require('mongoose');
mongoose.connect('mongodb://8.1.3.213:27017/test')

var app = express();
var port = process.env.PORT || 3399; // set our port

app.use(morgan('dev')); // log requests to the console
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


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
