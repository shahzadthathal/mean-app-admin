// Blog model
var mongoose = require('mongoose');

var blogSchema = mongoose.Schema({
	title:{ type:String, required:true, unique: true },
	slug:{ type:String, required:true },
	status:{ type:Number, required:true, default:1 },
	image:{ type:String, required:true },
	author:{ type:String, required:true },
	caption:{type:String},
	short_description:{ type:String, required:true },
	description:{ type:String, required:true },
	category:{ type:mongoose.Schema.Types.ObjectId, ref:'Category' },
	sub_category:{ type:mongoose.Schema.Types.ObjectId, ref:'Category', default:null},
	date_created:{ type:Date, default:Date() },
	tags: [String],
	post_type:{type:String, default:'blog'}
});
module.exports = mongoose.model('Blogs', blogSchema);
