
var mongoose = require('mongoose');

var contactRequestSchema = mongoose.Schema({
	name:{ type:String, required:true },
	email:{ type:String, required:true },
	subject:{type:String, required:true},
	message:{ type:String, required:true },
	});
module.exports = mongoose.model('contactrequest', contactRequestSchema);
