var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

  var User = mongoose.Schema({
  local : {
    email        : String,
    password     : String,
    username     : String,
    perspectives: [{type: ObjectId, ref: 'Perspective'}]
  }
});

User.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

User.methods.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

module.exports = mongoose.model('User', User);
