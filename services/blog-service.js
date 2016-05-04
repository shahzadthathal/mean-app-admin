
// blog Service

  var Promise = require('promise');
  var Models = require('../models');
  var Services = require('./common-service.js');
  
function list(req) {
  var list = {};
   return Models.BlogModel.count()
         .then(function(total){
          list.recordsTotal = total;
          list.recordsFiltered = total;
          return Models.BlogModel.find().skip(req.query.start).limit(req.query.length).sort({_id:-1});
         })
         .then(function(results){           
           list.draw = req.query.draw;
           list.data = results;
           return list;
         });
}
function detail(slug){
    return getBySlug(slug)
          .then(function(blog){
            return blog;
          });
}

function detailById(id){
     return get(id)
          .then(function(blog){
            return blog;
          });
}

function listByCategory(cateid){
   return Promise.denodeify(Models.BlogModel.find.bind(Models.BlogModel))({category:cateid})
      .then(function(results){
          return results;
      });
}

function listBySubCategory(cateid){
   return Promise.denodeify(Models.BlogModel.find.bind(Models.BlogModel))({sub_category:cateid})
      .then(function(results){
          return results;
      });
}

function listByTag(tag){
    return Promise.denodeify(Models.BlogModel.find.bind(Models.BlogModel))({ tags: tag })
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

            var blog = new Models.BlogModel({ 
          	    title: data.title,
          		  slug: data.slug,
          		  image: data.image,
                author: data.author,
                caption: data.caption,
                short_description:data.short_description,
          		  description: data.description,
          		  category: data.category,
                sub_category: data.sub_category,
          		  tags: data.tags
            });
            return Promise.denodeify(blog.save.bind(blog))()
            .then(function (blog) {
        		    return blog;
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
              .then(function (blog) {
                  blog.title = data.title,
              	  blog.slug  = data.slug,
                  blog.author = data.author,
              	  blog.image = data.image,
                  blog.caption = data.caption,
                  blog.short_description = data.short_description,
              	  blog.description = data.description,              	  
                  blog.category = data.category,
                  blog.sub_category = data.sub_category,
              	  blog.tags = data.tags,
              	  blog.date_created = data.date_created,
              	  blog.status = data.status
                  
                  return Promise.denodeify(blog.save.bind(blog))()
              })
              .then(function (blog) {
                return blog;
              });
        }
    });
}
  
function remove(id) {
    return Promise.denodeify(Models.BlogModel.remove.bind(Models.BlogModel))({ _id: id })
    .then(function () {
      return;
    })
}

function get(id) {
    return Promise.denodeify(Models.BlogModel.findById.bind(Models.BlogModel))(id)
    .then(function (model) {
      return model;
    });
}

function getBySlug(slug){
  return Promise.denodeify(Models.BlogModel.findOne.bind(Models.BlogModel))({slug:slug})
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