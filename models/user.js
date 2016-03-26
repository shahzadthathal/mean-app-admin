
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({ 
  	fname: 		{type:String, required:true},
  	lname: 		{type:String, required:true},
    email: 		{type:String, required:true},
    password: {type:String, required:true}, 
    salt: 		{type:String, required:true},
    phone: 		{type:String},
    image: 		{type:String}, 
    status: 	{type:Number, required:true, default:1},
    role: 		{type:Number, required:true, default:2}
  });

//userSchema.set('autoIndex', false); 
module.exports = mongoose.model('User', userSchema);