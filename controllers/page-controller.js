// Page Controller

var Services = require('../services');


module.exports.list = function(req, res){

	Services.PageSrvc.list(req)
	.then(function(results){
		res.json(results);
	});
}

module.exports.detail = function(req, res){

	Services.PageSrvc.detail(req.params.slug)
	.then(function(result){
		res.json(result);
	});
}

module.exports.detailById = function(req, res){

	Services.PageSrvc.detailById(req.params.id)
	.then(function(result){
		res.json(result);
	});
}

module.exports.create = function(req, res){
		Services.PageSrvc.create(req.body)
		.then(function(result){
			res.json(result);
		});
}

module.exports.update = function (req, res) {
    Services.PageSrvc.update(req.params.id, req.body)
    .then(function (result) {
      res.json(result);
    });
}

module.exports.delete = function (req, res) {
    Services.PageSrvc.remove(req.params.id)
    .then(function () {
      res.json();
    });
}
