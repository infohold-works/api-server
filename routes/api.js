var express = require('express');
var router = express.Router();
var Message = require('../models/message')

router.get('/', function(req, res, next) {
  res.json({ message: 'Welcome to MessageBox API' });
});

router.route('/message/:userid/:typeid/:type/:author/:title/:content')

// create a bear (accessed at POST http://localhost:8080/bears)
.post(function(req, res) {
  var messageArray = {
    id: '',
    userid: req.params.userid,
    userbrc: req.params.userbrc,
    typeid: req.params.typeid,
    type: req.params.type,
    title: req.params.title,
    author: req.params.author,
    desc: req.params.content.substring(0, 48),
    content: req.params.content,
    sendtime: getNowFormatDate()
  }
  Message.create(messageArray, function (err, result) {
    if (err) return console.log(err);
    res.json({message: 'message created.'})
  });
})

// get all the bears (accessed at GET http://localhost:8080/api/bears)
.get(function(req, res) {
  Message.find({}, function(err, message){
    if (err) return console.log(err);
    res.json(message)
  })
});

// 生成格式化后的当前时间
function getNowFormatDate() {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  function format(arg) {
    var reg = /^\d{1}$/;
    return reg.test(arg) ? ("0" + arg) : arg;
  }
  return year + "-" + format(month) + "-" + format(day) + " " + format(hours) + ":" + format(minutes) + ":" + format(seconds);
}

module.exports = router;
