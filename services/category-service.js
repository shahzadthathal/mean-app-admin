
// Product Category Service

  var Promise = require('promise');
  var Models = require('../models');
  var Services = require('./common-service.js');

  
function list() {
	return Promise.denodeify(Models.CategoryModel.find.bind(Models.CategoryModel))()
    .then(function (results) {
      return results;
    });
}




function categoryListByType(type){ 
  return Promise.denodeify(Models.CategoryModel.find.bind(Models.CategoryModel))({type:type})
    .then(function (results) {
      return results;
    });
}

function parentCatList(){ 
  return Promise.denodeify(Models.CategoryModel.find.bind(Models.CategoryModel))({parentID: {$eq:null}})
    .then(function (results) {
      return results;
    });
}

function parentProductCatList(type){ 
  return Promise.denodeify(Models.CategoryModel.find.bind(Models.CategoryModel))({parentID: {$eq:null},type:type})
    .then(function (results) {
      return results;
    });
}

function parentBlogCatList(type){ 
  return Promise.denodeify(Models.CategoryModel.find.bind(Models.CategoryModel))({parentID: {$eq:null},type:type})
    .then(function (results) {
      return results;
    });
}


function subCatList(id) {
  return Promise.denodeify(Models.CategoryModel.find.bind(Models.CategoryModel))({parentID: id})
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
  console.log(data);
return Services.getBySlug(data.slug)
  .then(function(res){
      if(res != null)
        return "Slug exist";
      else{

        var productCategory = new Models.CategoryModel({ 
            title: data.title,
    	      slug:data.slug,
            status: data.status,
    	      description: data.description,
            parentID: data.parentID,
            type:data.type,
            post_type:data.post_type
        });
        return Promise.denodeify(productCategory.save.bind(productCategory))()
        .then(function (productCategory) {
    		    return productCategory;
        });
      }
    });
}
function update(id, data) {
    
 return Services.verifyBySlug(data.slug,id)
  .then(function(res){
      if(res != null)
        return "Slug exist";
      else{

            return get(id)
            .then(function (productCategory) {
              productCategory.title = data.title,
          	  productCategory.slug  = data.slug,
          	  productCategory.description = data.description,
          	  productCategory.status = data.status,
              productCategory.parentID = data.parentID,
              productCategory.type = data.type,
              productCategory.post_type = data.post_type

              return Promise.denodeify(productCategory.save.bind(productCategory))()
            })
            .then(function (productCategory) {
              return productCategory;
            });
         }
    });
}
  
function remove(id) {
    return Promise.denodeify(Models.CategoryModel.remove.bind(Models.CategoryModel))({ _id: id })
    .then(function () {
      return;
    })
}

function get(id) {
    return Promise.denodeify(Models.CategoryModel.findById.bind(Models.CategoryModel))(id)
    .then(function (model) {
      return model;
    });
}

function getBySlug(slug){
  return Promise.denodeify(Models.CategoryModel.findOne.bind(Models.CategoryModel))({slug:slug})
  .then(function(model){
    return model;
  });
}

module.exports = {
	list:list,
  categoryListByType:categoryListByType,
  parentCatList:parentCatList,
  parentProductCatList:parentProductCatList,
  parentBlogCatList:parentBlogCatList,
  subCatList:subCatList,
  detail:detail,
	create:create,
	update:update,
	remove:remove,
	get:get,
  getBySlug:getBySlug
}