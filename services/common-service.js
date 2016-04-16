
// Common Service

var Promise = require('promise');
var Models = require('../models');
  


/*function getBySlug(slug){
  return Promise.denodeify(Models.ProductModel.findOne.bind(Models.ProductModel))({slug:slug})
  .then(function(model){
    return model;
  });
}
*/

function getBySlug(slug){
  return Promise.denodeify(Models.ProductModel.findOne.bind(Models.ProductModel))({slug:slug})
	  .then(function(product){
			console.log('Step 1 in product');
			if(product){
				console.log(product);
				return product;
			}

		return Promise.denodeify(Models.CategoryModel.findOne.bind(Models.CategoryModel))({slug:slug})
			.then(function(category){
				console.log('Step 2 in product category ');
				if(category)
					return category;
				return Promise.denodeify(Models.TagModel.findOne.bind(Models.TagModel))({title:slug})
			 		.then(function(tag){
						console.log('Step 3 in tag');
						if(tag)
							return tag;					
						return Promise.denodeify(Models.BlogModel.findOne.bind(Models.BlogModel))({slug:slug})
							.then(function(blog){
								console.log('Step 4 in blog category');
								if(blog)
									return blog;
								return null;								
							}); //blog
					}); //tag
		 	}); //product category
	  }); //porduct
}

function verifyBySlug(slug, id){
  return Promise.denodeify(Models.ProductModel.findOne.bind(Models.ProductModel))({slug:slug})
	  .then(function(product){
			if(product && product._id == id)
				return null;
			else if(product && product._id != id)
				return product;
		return Promise.denodeify(Models.CategoryModel.findOne.bind(Models.CategoryModel))({slug:slug})
			.then(function(category){
				console.log('Step 2 in product category ');
				if(category && category._id == id)
					return null;
				else if(category && category._id !=id)
					return category;
				return Promise.denodeify(Models.TagModel.findOne.bind(Models.TagModel))({title:slug})
			 		.then(function(tag){
						console.log('Step 3 in tag');
						if(tag && tag._id == id)
							return null
						else if(tag && tag._id !=id)
							return tag;
							return Promise.denodeify(Models.BlogModel.findOne.bind(Models.BlogModel))({slug:slug})
									.then(function(blog){
										console.log('Step 5 in blog');
										if(blog && blog._id ==id)
											return null
										else if(blog && blog._id !=id)
											return blog;
										return null;
							}); //blog

					}); //tag
		 	}); //product category
	  }); //porduct
}

module.exports = {
  getBySlug:getBySlug,
  verifyBySlug:verifyBySlug
};