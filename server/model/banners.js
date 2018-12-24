var mongoose = require('mongoose');

var bannerSchema = new mongoose.Schema({
	username : String,
	title : String
});

var BannerModel = mongoose.model('banner' , bannerSchema);

module.exports = BannerModel;