
//tag service

var Promise = require('promise');
var Models  =  require('../models');


function list() {
    return Promise.denodeify(Models.TagModel.find.bind(Models.TagModel))()
    .then(function (tags) {
      return tags;
    });
}

function detail(tag){
	console.log(tag);
    return getByTag(tag)
          .then(function(tagModel){
            return tagModel;
          });
}

function create(data){
	var tagModel = new Models.TagModel({
		title: data.title,
		description: data.description
	});
	
	return Promise.denodeify(tagModel.save.bind(tagModel))()
    .then(function (tagModel) {
		    return tagModel;
    });
}

function getByTag(tag){
  return Promise.denodeify(Models.TagModel.findOne.bind(Models.TagModel))({title:tag})
  .then(function(model){
    return model;
  });
}

function update(id, data) {
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
	create:create,
	getByTag:getByTag,
  update:update,
  remove:remove,
  get:get
}