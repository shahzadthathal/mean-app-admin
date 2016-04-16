
var mongoose = require('mongoose');

var tagSchema = mongoose.Schema({
	title:{ type:String, required:true },
	description:{ type:String, required:true },
	post_type:{type:String, default:'tag'}
	});
module.exports = mongoose.model('tag', tagSchema);
