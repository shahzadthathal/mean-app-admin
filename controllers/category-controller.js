// Product Category Controller

var Services = require('../services');

module.exports.list = function(req, res){
	 Services.CategorySrvc.list()
	 .then( function(results){
			 res.json(results);
	 });
}



module.exports.categoryListByType = function(req, res){
	Services.CategorySrvc.categoryListByType(req.params.type)
	.then(function(results){
		res.json(results);
	});
}

module.exports.parentCatList = function(req, res){

	Services.CategorySrvc.parentCatList()
	 .then( function(results){
			 res.json(results);
	 });

}

module.exports.parentProductCatList = function(req, res){

	Services.CategorySrvc.parentProductCatList(req.params.type)
	 .then( function(results){
			 res.json(results);
	 });
}


module.exports.parentBlogCatList = function(req, res){

	Services.CategorySrvc.parentBlogCatList(req.params.type)
	 .then( function(results){
			 res.json(results);
	 });
}


module.exports.subCatList = function(req, res){

	Services.CategorySrvc.subCatList(req.params.id)
	 .then( function(results){
			 res.json(results);
	 });
}



module.exports.detail = function(req, res){

	Services.CategorySrvc.detail(req.params.slug)
	.then(function(result){
		res.json(result);
	});
}

module.exports.create = function(req, res){
	Services.CategorySrvc.create(req.body)
	.then( function(result){	
			res.json(result);
	});
}

module.exports.update = function (req, res) {
    Services.CategorySrvc.update(req.params.id, req.body)
    .then(function (result) {
      res.json(result);
    });
}

module.exports.delete = function (req, res) {
    Services.CategorySrvc.remove(req.params.id)
    .then(function () {
      res.json();
    });
}