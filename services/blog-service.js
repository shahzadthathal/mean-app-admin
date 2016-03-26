
// blog Service

  var Promise = require('promise');
  var Models = require('../models');
  
function list() {
	return Promise.denodeify(Models.BlogModel.find.bind(Models.BlogModel))()
    .then(function (results) {
      return results;
    });
}
function detail(slug){
    return getBySlug(slug)
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

function listByTag(tag){
    return Promise.denodeify(Models.BlogModel.find.bind(Models.BlogModel))({ tags: tag })
      .then(function(results){
          return results;
      });
}

function create(data) {
    var blog = new Models.BlogModel({ 
  	    title: data.title,
  		  slug: data.slug,
  		  image: data.image,
  		  description: data.description,
  		  category: data.category,
  		  tags: data.tags
    });
    return Promise.denodeify(blog.save.bind(blog))()
    .then(function (blog) {
		    return blog;
    });
}
function update(id, data) {
  return get(id)
    .then(function (blog) {
        blog.title = data.title,
    	  blog.slug  = data.slug,
    	  blog.image = data.image,
    	  blog.description = data.description,
    	  blog.category = data.category,
    	  blog.tags = data.tags,
    	  blog.date_created = data.date_created,
    	  blog.status = data.status
        
        return Promise.denodeify(blog.save.bind(blog))()
    })
    .then(function (blog) {
      return blog;
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
  listByCategory:listByCategory,
	create:create,
	update:update,
	remove:remove,
	get:get,
  getBySlug:getBySlug,
  listByTag:listByTag
}