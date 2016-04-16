
var mongoose = require('mongoose');

var categorySchema = mongoose.Schema({
	title:{ type:String, required:true },
	slug:{ type:String, required:true },
	status:{ type:Number, required:true, default:1},
	description:{ type:String, required:true },
	post_type:{type:String, default:'product_catgory'},
	parentID:{ type:mongoose.Schema.Types.ObjectId, ref:'Category', default:null},
	type:{type:String, required:true, default:'product'}
});
module.exports = mongoose.model('Category', categorySchema);