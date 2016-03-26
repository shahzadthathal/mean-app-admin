
var mongoose = require('mongoose');

var productCategorySchema = mongoose.Schema({
	title:{ type:String, required:true },
	slug:{ type:String, required:true },
	status:{ type:Number, required:true, default:1},
	description:{ type:String, required:true },
});
module.exports = mongoose.model('ProductCategory', productCategorySchema);