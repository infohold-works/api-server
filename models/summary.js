var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var summarySchema = new Schema({
  userid: String,
  typeid: Number,
  message: [{
    id: Number,
    title: String,
    desc: String,
    sendtime: String,
    read: Boolean
  }],
  count: Number
})

module.exports = mongoose.model('Mb_summary', summarySchema)
