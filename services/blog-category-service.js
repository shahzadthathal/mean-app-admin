
// blog Category Service

  var Promise = require('promise');
  var Models = require('../models');
  
function list() {
	return Promise.denodeify(Models.BlogCategoryModel.find.bind(Models.BlogCategoryModel))()
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

function create(data) {


    //data.title.replace(/\s/g,'-').toLowerCase() // Blog Category convert into blog-category

    var blogCategory = new Models.BlogCategoryModel({ 
        title: data.title,
	      slug:data.slug,
	      description: data.description
    });
    return Promise.denodeify(blogCategory.save.bind(blogCategory))()
    .then(function (blogCategory) {
		    return blogCategory;
    });
}
function update(id, data) {
  console.log(data);
    return get(id)
    .then(function (blogCategory) {
      blogCategory.title = data.title,
  	  blogCategory.slug  = data.slug,
  	  blogCategory.description = data.description,
  	  blogCategory.status = data.status
      return Promise.denodeify(blogCategory.save.bind(blogCategory))()
    })
    .then(function (blogCategory) {
      return blogCategory;
    });
}
  
function remove(id) {
    return Promise.denodeify(Models.BlogCategoryModel.remove.bind(Models.BlogCategoryModel))({ _id: id })
    .then(function () {
      return;
    })
}

function get(id) {
    return Promise.denodeify(Models.BlogCategoryModel.findById.bind(Models.BlogCategoryModel))(id)
    .then(function (model) {
      return model;
    });
}

function getBySlug(slug){
  return Promise.denodeify(Models.BlogCategoryModel.findOne.bind(Models.BlogCategoryModel))({slug:slug})
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