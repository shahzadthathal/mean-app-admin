
var mongoose = require('mongoose');

var tagSchema = mongoose.Schema({
	title:{ type:String, required:true },
	description:{ type:String, required:true }
	});
module.exports = mongoose.model('tag', tagSchema);
