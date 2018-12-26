var mongoose = require('mongoose');

var classifySchema = new mongoose.Schema({
	contents : Array,
	username : String
});

var ClassifyModel = mongoose.model('classify' , classifySchema);

module.exports = ClassifyModel;