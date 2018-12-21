var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	username : String,
	password : String
});

var UserModel = mongoose.model('user' , userSchema);

module.exports = UserModel;