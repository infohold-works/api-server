var express = require('express');
var router = express.Router();
var socket = require('socket.io-client')('http://localhost:3000', {
  'force new connection': true
});
var Message = require('../models/message')
var Summary = require('../models/summary')
var uuid = require('node-uuid');

// API页面 (路径 GET http://localhost:3399/api)
router.get('/', function(req, res, next) {
  res.json({
    message: 'Welcome to MessageBox API'
  });
});

// 获取所有消息 (路径 GET http://localhost:3399/api/message)
router.route('/message')
  .get(function(req, res) {
    Message.find({}, function(err, message) {
      if (err) return console.log(err);
      res.json(message)
    })
  });

// 根据消息id获取消息 (路径 GET http://localhost:3399/api/message/:id)
router.route('/message/:id')
  .get(function(req, res) {
    Message.find({
      "id": req.params.id
    }, function(err, message) {
      if (err) return console.log(err);
      res.json(message)
    })
  });

// 创建消息并推送 (路径 POST http://localhost:3399/api/message/:userid/:typeid/:type/:author/:title/:content)
router.route('/message/:userid/:typeid/:type/:author/:title/:content')
  .post(function(req, res) {
    var messageArray = {
      id: uuid.v1(),
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
    var mesContent = {
      userid: req.params.userid,
      title: req.params.title,
      desc: req.params.content.substring(0, 48),
      typeid: req.params.typeid
    }
    Message.create(messageArray, function(err, result) {
      if (err) return console.log(err);
      res.json({
        message: 'message created.',
        id: messageArray.id
      })
      if (messageArray.type == 'private') { // private消息
        Summary.findOne({
          userid: messageArray.userid,
          typeid: messageArray.typeid
        }, function(err, summary) {
          var query = {
            userid: messageArray.userid,
            typeid: messageArray.typeid
          };
          var set = {
            $set: {
              count: summary.count + 1
            }
          }
          var push = {
            $push: {
              message: {
                id: messageArray.id,
                title: messageArray.title,
                desc: messageArray.desc,
                sendtime: messageArray.sendtime,
                read: false
              }
            }
          }

          Summary.update(query, set).exec();
          Summary.update(query, push, null, function(err, raw) {
            if (!err) {
              socket.emit('private message', mesContent);
            }
          });
        });
      } else { // public消息
        Summary.find({
          typeid: messageArray.typeid
        }, function(err, summaries) {
          for (var i in summaries) {
            var query = {
              userid: summaries[i].userid,
              typeid: messageArray.typeid
            };
            var set = {
              $set: {
                count: summaries[i].count + 1
              }
            };
            var push = {
              $push: {
                message: {
                  id: messageArray.id,
                  title: messageArray.title,
                  desc: messageArray.desc,
                  sendtime: messageArray.sendtime,
                  read: false
                }
              }
            };
            Summary.update(query, set).exec();
            Summary.update(query, push, null, function(err, raw) {
              if (!err) {
                socket.emit('public message', mesContent);
              }
            });
          }
        });
      }
    });
  })

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
