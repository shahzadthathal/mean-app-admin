// User Controller

var Services 	= require('../services');
var jwt 		= require('jsonwebtoken');
var secret 		= 'ecommerce app';

module.exports.create = function (req, res) {
    Services.UserSrvc.create(req.body)
    .then(function (user) {
					
		var newuser = {
							_id: user._id,
							email: user.email,
							fname: user.fname,
							lname: user.lname,
							role: 1
						};
						
      // Grant access token for user requests
	  		 //expiresIn: expressed in seconds or a string describing a time span rauchg/ms. Eg: 60, "2 days", "10h", "7d"
      var token = jwt.sign(newuser, secret, { expiresIn: "1h" });
	  //var token = jwt.sign(user, secret, { expiresInMinutes: 60*5 });
	   
      res.json({ token: token });
    }, function (error) {
      res.json({ error: error.message });
    });
  }

module.exports.login = function(req, res){
	Services.UserSrvc.login(req.body.email, req.body.password)
	.then(function(user){
			var newuser = {
							_id: user._id,
							email: user.email,
							fname: user.fname,
							lname: user.lname,
							role: user.role,
							phone: user.phone,
							image:user.image
						};
		// Grant access token for user requests
		 //expiresIn: expressed in seconds or a string describing a time span rauchg/ms. Eg: 60, "2 days", "10h", "7d"
		 var token = jwt.sign(newuser, secret, { expiresIn: '1h' }); 
	res.json({ token: token });	 
    //res.json({ token: token });

	},function(error){
			res.json({error:error.message});
	});
}


module.exports.me = function (req, res) {
    // For security, we need to clean the user object and only
    // send non sensitive information back (e.g. password hash).
    var cleanUser = { 
	      _id:req.user._id,
	      email:req.user.email,
		  fname:req.user.fname,
		  lname:req.user.lname,
		  role:req.user.role,
		  phone:req.user.phone,
		  image:req.user.image
    	}
    res.json(cleanUser);
}

module.exports.update = function (req, res) {
   Services.UserSrvc.update(req.params.id, req.body)
    .then(function (result) {
      res.json(result);
    });
}