
var mongoose = require('mongoose');

var pageSchema = mongoose.Schema({
	title:{ type:String, required:true},
	slug:{type:String, required:true},
	description:{ type:String, required:true },
	meta_title:{ type:String},
	meta_kewords:{type:String},
	meta_description:{ type:String}
	});
module.exports = mongoose.model('pages', pageSchema);
