
// Product Service

  var Promise = require('promise');
  var Models = require('../models');
  
function list() {
	return Promise.denodeify(Models.ProductModel.find.bind(Models.ProductModel))()
    .then(function (results) {
      return results;
    });
}
function detail(slug){
    return getBySlug(slug)
          .then(function(product){
            return product;
          });
}

function listByCategory(cateid){
   return Promise.denodeify(Models.ProductModel.find.bind(Models.ProductModel))({category:cateid})
      .then(function(results){
          return results;
      });
}

function listByTag(tag){
    return Promise.denodeify(Models.ProductModel.find.bind(Models.ProductModel))({ tags: tag })
      .then(function(results){
          return results;
      });
}

function create(data) {
  console.log(' server product controller',data);
    var product = new Models.ProductModel({ 
	    title: data.title,
		  slug: data.slug,
		  sale_price: data.sale_price,
		  general_price: data.general_price,
		  image: data.image,
      caption:data.caption,
      short_description:data.short_description,
		  description: data.description,
		  category: data.category,
		  tags: data.tags
    });
    return Promise.denodeify(product.save.bind(product))()
    .then(function (product) {
		    return product;
    });
}
function update(id, data) {
  return get(id)
    .then(function (product) {
        product.title = data.title,
    	  product.slug  = data.slug,
    	  product.sale_price = data.sale_price,
    	  product.general_price = data.general_price,
    	  product.image = data.image,
        product.caption = data.caption,
        product.short_description = data.short_description,
    	  product.description = data.description,
    	  product.category = data.category,
    	  product.tags = data.tags,
    	  product.date_created = data.date_created,
    	  product.status = data.status
        
        return Promise.denodeify(product.save.bind(product))()
    })
    .then(function (product) {
      return product;
    });
}
  
function remove(id) {
    return Promise.denodeify(Models.ProductModel.remove.bind(Models.ProductModel))({ _id: id })
    .then(function () {
      return;
    })
}

function get(id) {
    return Promise.denodeify(Models.ProductModel.findById.bind(Models.ProductModel))(id)
    .then(function (model) {
      return model;
    });
}

function getBySlug(slug){
  return Promise.denodeify(Models.ProductModel.findOne.bind(Models.ProductModel))({slug:slug})
  .then(function(model){
    return model;
  });
}


module.exports = {
	list:list,
  detail:detail,
  listByCategory:listByCategory,
	create:create,
	update:update,
	remove:remove,
	get:get,
  getBySlug:getBySlug,
  listByTag:listByTag
}