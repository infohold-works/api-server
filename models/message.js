var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
	id: String,
  userid: String,
  userbrc: String,
  typeid: Number,
  type: String,
  title: String,
  author: String,
  desc: String,
  content: String,
  sendtime: String
});

module.exports = mongoose.model('Mb_message', MessageSchema);
