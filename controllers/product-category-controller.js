// Product Category Controller

var Services = require('../services');
  
module.exports.list = function(req, res){
	 Services.ProductCategorySrvc.list()
	 .then( function(results){
			 res.json(results);
	 });
}

module.exports.detail = function(req, res){

	Services.ProductCategorySrvc.detail(req.params.slug)
	.then(function(result){
		res.json(result);
	});
}

module.exports.create = function(req, res){
	Services.ProductCategorySrvc.create(req.body)
	.then( function(result){	
			res.json(result);
	});
}

module.exports.update = function (req, res) {
    Services.ProductCategorySrvc.update(req.params.id, req.body)
    .then(function (result) {
      res.json(result);
    });
}

module.exports.delete = function (req, res) {
    Services.ProductCategorySrvc.remove(req.params.id)
    .then(function () {
      res.json();
    });
}