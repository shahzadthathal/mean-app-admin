
//page service

var Promise = require('promise');
var Models  =  require('../models');


function list(req) {
    var list = {};
   return Models.PageModel.count()
         .then(function(total){
          list.recordsTotal = total;
          list.recordsFiltered = total;
          return Models.PageModel.find().skip(req.query.start).limit(req.query.length).sort({_id:-1});
         })
         .then(function(results){           
           list.draw = req.query.draw;
           list.data = results;
           return list;
         });
}

function detail(page){
    return getpagebyslug(page)
          .then(function(pageModel){
            return pageModel;
          });
}

function detailById(id){
     return get(id)
          .then(function(blog){
            return blog;
          });
}

function create(data){
	var PageModel = new Models.PageModel({
		title: data.title,
		slug:data.slug,
    description: data.description
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
        page.description = data.description
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
  detailById:detailById,
	create:create,
	getpagebyslug:getpagebyslug,
  update:update,
  remove:remove,
  get:get
}