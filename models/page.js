
var mongoose = require('mongoose');

var pageSchema = mongoose.Schema({
	title:{ type:String, required:true},
	slug:{type:String, required:true},
	description:{ type:String, required:true },
	post_type:{type:String, default:'page'}
	});
module.exports = mongoose.model('pages', pageSchema);
