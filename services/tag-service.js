
//tag service

var Promise = require('promise');
var Models  =  require('../models');
var Services = require('./common-service.js');

function list(req) {
     var list = {};
     return Models.TagModel.count()
         .then(function(total){
          list.recordsTotal = total;
          list.recordsFiltered = total;
          return Models.TagModel.find().skip(req.query.start).limit(req.query.length).sort({_id:-1});
         })
         .then(function(results){           
           list.draw = req.query.draw;
           list.data = results;
           return list;
         });
}

function detailById(id){
     return get(id)
          .then(function(blog){
            return blog;
          });
}

function detail(tag){
    return getByTag(tag)
          .then(function(tagModel){
            return tagModel;
          });
}

function create(data){

  return Services.getBySlug(data.slug)
  .then(function(res){
      if(res != null)
        return "Slug exist";
      else{
            	var tagModel = new Models.TagModel({
            		title: data.title,
            		description: data.description
            	});
            	
            	return Promise.denodeify(tagModel.save.bind(tagModel))()
                .then(function (tagModel) {
            		    return tagModel;
                });
          }
      });        
}

function getByTag(tag){
  return Promise.denodeify(Models.TagModel.findOne.bind(Models.TagModel))({title:tag})
  .then(function(model){
    return model;
  });
}

function update(id, data) {

  return Services.verifyBySlug(data.slug,id)
  .then(function(res){
      if(res != null)
        return "Slug exist";
      else{

              return get(id)
                .then(function (tag) {
                    tag.title = data.title,
                    tag.description = data.description        
                    return Promise.denodeify(tag.save.bind(tag))()
                })
                .then(function (tag) {
                  return tag;
                });
          }
      });
}
  
function remove(id) {
    return Promise.denodeify(Models.TagModel.remove.bind(Models.TagModel))({ _id: id })
    .then(function () {
      return;
    })
}

function get(id) {
    return Promise.denodeify(Models.TagModel.findById.bind(Models.TagModel))(id)
    .then(function (model) {
      return model;
    });
}


module.exports = {
	list:list,
	detail:detail,
  detailById:detailById,
	create:create,
	getByTag:getByTag,
  update:update,
  remove:remove,
  get:get
}