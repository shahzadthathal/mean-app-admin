// Product Controller

var Services = require('../services');
var fs       = require( "fs" );
var crypto 	 = require('crypto');

module.exports.list = function(req, res){
	 Services.ProductSrvc.list()
	 .then( function(results){
			 res.json(results);
	 });
}

module.exports.detail = function(req, res){

	Services.ProductSrvc.detail(req.params.slug)
	.then(function(result){
		res.json(result);
	});
}

module.exports.listbycategory = function(req, res){
	
	Services.ProductSrvc.listByCategory(req.params.categoryid)
	.then(function(result){
		res.json(result);
	});
}


module.exports.detailByCategorySlug = function(req, res){
	
	Services.ProductCategorySrvc.detail(req.params.slug)
	.then(function(category){
		Services.ProductSrvc.listByCategory(category._id)
		.then(function(result){
			res.json(result);
		});

	});
}

module.exports.listByTag = function(req, res){

	Services.ProductSrvc.listByTag(req.params.tag)
	.then(function(products){
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

	Services.ProductSrvc.create(req.body)
	.then( function(result){	
			res.json(result);
	});

}

module.exports.update = function (req, res) {

  	//req.body.tags = req.body.tags.replace(/\s/g , '').split(",");

    Services.ProductSrvc.update(req.params.id, req.body)
    .then(function (result) {
      res.json(result);
    });
}

module.exports.delete = function (req, res) {
    Services.ProductSrvc.remove(req.params.id)
    .then(function () {
      res.json();
    });
}

module.exports.uploadImage = function(req, res){

	/*var newName = crypto.randomBytes(Math.ceil(15 * 3 / 4))
			        .toString('base64')
			        .slice(0, 15)        
			        .replace(/\+/g, '0')  
			        .replace(/\//g, '0'); */

	
	var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        //console.log("Uploading: " + filename); 
        fstream = fs.createWriteStream('./uploads/' + filename);
        file.pipe(fstream);
        fstream.on('close', function () {
           res.json({imageName:filename});	
        });
    });

	
}
