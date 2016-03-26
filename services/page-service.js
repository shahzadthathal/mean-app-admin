
//page service

var Promise = require('promise');
var Models  =  require('../models');


function list() {
    return Promise.denodeify(Models.PageModel.find.bind(Models.PageModel))()
    .then(function (pages) {
      return pages;
    });
}

function detail(page){
    return getpagebyslug(page)
          .then(function(pageModel){
            return pageModel;
          });
}

function create(data){
	var PageModel = new Models.PageModel({
		title: data.title,
		slug:data.slug,
    description: data.description,
    meta_title: data.meta_title,
    meta_kewords: data.meta_kewords,
    meta_description: data.meta_description
	});	
	return Promise.denodeify(PageModel.save.bind(PageModel))()
    .then(function (PageModel) {
		    return PageModel;
    });
}

function getpagebyslug(page){
  return Promise.denodeify(Models.PageModel.findOne.bind(Models.PageModel))({slug:page})
  .then(function(model){
    return model;
  });
}



function update(id, data) {
  return get(id)
    .then(function (page) {
        page.title = data.title,
        page.slug =data.slug,
        page.description = data.description,
        page.meta_title = data.meta_title,
        page.meta_kewords = data.meta_kewords,
        page.meta_description = data.meta_description
        return Promise.denodeify(page.save.bind(page))()
    })
    .then(function (page) {
      return page;
    });
}
  
function remove(id) {
    return Promise.denodeify(Models.PageModel.remove.bind(Models.PageModel))({ _id: id })
    .then(function () {
      return;
    })
}

function get(id) {
    return Promise.denodeify(Models.PageModel.findById.bind(Models.PageModel))(id)
    .then(function (model) {
      return model;
    });
}


module.exports = {
	list:list,
	detail:detail,
	create:create,
	getpagebyslug:getpagebyslug,
  update:update,
  remove:remove,
  get:get
}