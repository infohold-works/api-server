var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  id: String,
  userid: String,
  username: String,
  password: String,
  online_stat: Boolean,
  login_time: String,
  last_login_time: String,
  socket_id: String
})

module.exports = mongoose.model('Mb_user', userSchema);
