
// Product Service

  var Promise = require('promise');
  var Models = require('../models');
  var Services = require('./common-service.js');



function list(req) {
    var list = {};

    //console.log(req.query.start);
    //console.log(req.query.length);
    //console.log(req.query.draw);

    return Models.ProductModel.count()
         .then(function(total){
          list.recordsTotal = total;
          list.recordsFiltered = total;
          return Models.ProductModel.find().skip(req.query.start).limit(req.query.length).sort({_id:-1});
         })
         .then(function(results){
           
           list.draw = req.query.draw;
           list.data = results;
           return list;
         });
      
  
	/*return Promise.denodeify(Models.ProductModel.find.bind(Models.ProductModel)) ({},{limit:2})
    .then(function (results) {
      return results;
    });
    */
}
function detail(slug){
    return getBySlug(slug)
          .then(function(product){
            return product;
          });
}


function detailById(id){
     return get(id)
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

function listBySubCategory(cateid){
   return Promise.denodeify(Models.ProductModel.find.bind(Models.ProductModel))({sub_category:cateid})
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

  return Services.getBySlug(data.slug)
  .then(function(res){
      if(res != null)
        return "Slug exist";
      else{
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
              sub_category: data.sub_category,
              tags: data.tags
            });
            return Promise.denodeify(product.save.bind(product))()
            .then(function (product) {
                return product;
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
              product.sub_category= data.sub_category,
          	  product.tags = data.tags,
          	  product.date_created = data.date_created,
          	  product.status = data.status
              
              return Promise.denodeify(product.save.bind(product))()
          })
          .then(function (product) {
            return product;
          });
    }
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
  detailById:detailById,
  listByCategory:listByCategory,
  listBySubCategory:listBySubCategory,
	create:create,
	update:update,
	remove:remove,
	get:get,
  getBySlug:getBySlug,
  listByTag:listByTag
}