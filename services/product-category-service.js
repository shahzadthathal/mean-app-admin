
// Product Category Service

  var Promise = require('promise');
  var Models = require('../models');
  
function list() {
	return Promise.denodeify(Models.ProductCategoryModel.find.bind(Models.ProductCategoryModel))()
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

function create(data) {
    var productCategory = new Models.ProductCategoryModel({ 
        title: data.title,
	      slug:data.slug,
	      description: data.description
    });
    return Promise.denodeify(productCategory.save.bind(productCategory))()
    .then(function (productCategory) {
		    return productCategory;
    });
}
function update(id, data) {
    return get(id)
    .then(function (productCategory) {
      productCategory.title = data.title,
  	  productCategory.slug  = data.slug,
  	  productCategory.description = data.description,
  	  productCategory.status = data.status
      return Promise.denodeify(productCategory.save.bind(productCategory))()
    })
    .then(function (productCategory) {
      return productCategory;
    });
}
  
function remove(id) {
    return Promise.denodeify(Models.ProductCategoryModel.remove.bind(Models.ProductCategoryModel))({ _id: id })
    .then(function () {
      return;
    })
}

function get(id) {
    return Promise.denodeify(Models.ProductCategoryModel.findById.bind(Models.ProductCategoryModel))(id)
    .then(function (model) {
      return model;
    });
}

function getBySlug(slug){
  return Promise.denodeify(Models.ProductCategoryModel.findOne.bind(Models.ProductCategoryModel))({slug:slug})
  .then(function(model){
    return model;
  });
}

module.exports = {
	list:list,
  detail:detail,
	create:create,
	update:update,
	remove:remove,
	get:get,
  getBySlug:getBySlug
}