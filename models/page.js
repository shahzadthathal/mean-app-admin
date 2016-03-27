
var mongoose = require('mongoose');

var pageSchema = mongoose.Schema({
	title:{ type:String, required:true},
	slug:{type:String, required:true},
	description:{ type:String, required:true }
	});
module.exports = mongoose.model('pages', pageSchema);
