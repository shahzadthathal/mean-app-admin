
var mongoose = require('mongoose');

var settingSchema = new mongoose.Schema({ 
  	facebook_appid: {type:String, required:true},
  	facebook_url: 	{type:String, required:true},
  	google_url: {type:String, required:true},
  	linkedin_id: 	{type:String, required:true},
  	twitter_url: {type:String, required:true},
  	pinit_url: 	{type:String, required:true}
  });

module.exports = mongoose.model('Setting', settingSchema);


//*3000#