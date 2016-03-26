// Product Controller

var Services = require('../services');

module.exports.list = function(req, res){
	 Services.BlogSrvc.list()
	 .then( function(results){
			 res.json(results);
	 });
}

module.exports.detail = function(req, res){

	Services.BlogSrvc.detail(req.params.slug)
	.then(function(result){
		res.json(result);
	});
}

module.exports.listbycategory = function(req, res){
	
	Services.BlogSrvc.listByCategory(req.params.categoryid)
	.then(function(result){
		res.json(result);
	});
}


module.exports.detailByCategorySlug = function(req, res){
	
	Services.BlogCategorySrvc.detail(req.params.slug)
	.then(function(category){
		Services.BlogSrvc.listByCategory(category._id)
		.then(function(result){
			res.json(result);
		});

	});
}

module.exports.listByTag = function(req, res){

	Services.BlogSrvc.listByTag(req.params.tag)
	.then(function(products){
		console.log(products);
		res.json(products);
	});
}


module.exports.create = function(req, res){

/*
/\s/g
It's a regular expression.
 // is the syntax for a regular expression, everything in between the /'s will be evaluated on the input and anything that matches the expression will then be passed to whatever function you are using.
The g at the end of the // means "global", that means do the search on the entire input 
instead of just the first match it comes across. 
*/
	//.replace(/\s/''/g)
	/*
	req.body.tags = req.body.tags.split(",").map(function(tag) {
    	return { "name": tag };
  	});
  	*/

  	//req.body.tags = req.body.tags.replace(/\s/g , '').split(",");

	Services.BlogSrvc.create(req.body)
	.then( function(result){	
			res.json(result);
	});

}

module.exports.update = function (req, res) {

 // 	req.body.tags = req.body.tags.replace(/\s/g , '').split(",");

    Services.BlogSrvc.update(req.params.id, req.body)
    .then(function (result) {
      res.json(result);
    });
}

module.exports.delete = function (req, res) {
    Services.BlogSrvc.remove(req.params.id)
    .then(function () {
      res.json();
    });
}