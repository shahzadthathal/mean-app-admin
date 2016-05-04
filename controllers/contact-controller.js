
var Services = require('../services');

module.exports.create = function(req, res){
		Services.ContactSrvc.create(req.body)
		.then(function(result){
			res.json(result);
		});
}

module.exports.list = function(req, res){

	Services.ContactSrvc.list(req)
	.then(function(results){
		res.json(results);
	});
}

module.exports.detail = function(req, res){

	Services.ContactSrvc.detail(req.params.tag)
	.then(function(result){
		res.json(result);
	});
}

module.exports.detailById = function(req, res){

	Services.ContactSrvc.detailById(req.params.id)
	.then(function(result){
		res.json(result);
	});
}

module.exports.update = function (req, res) {

  	//req.body.tags = req.body.tags.replace(/\s/g , '').split(",");

    Services.ContactSrvc.update(req.params.id, req.body)
    .then(function (result) {
      res.json(result);
    });
}

module.exports.delete = function (req, res) {
    Services.ContactSrvc.remove(req.params.id)
    .then(function () {
      res.json();
    });
}
