// Common Controller

var Services = require('../services');

module.exports.findBySlug = function(req, res){

	Services.CommonSrvc.getBySlug(req.params.slug)
	.then(function(result){
		res.json(result);
	});
}
