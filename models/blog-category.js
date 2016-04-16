
var mongoose = require('mongoose');

var blogCategorySchema = mongoose.Schema({
	title:{ type:String, required:true },
	slug:{ type:String, required:true },
	status:{ type:Number, required:true, default:1 },
	description:{ type:String, required:true },
	post_type:{type:String, default:'blog_catgory'}
});
module.exports = mongoose.model('BlogCategory', blogCategorySchema);