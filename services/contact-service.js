
//tag service

var Promise = require('promise');
var Models  =  require('../models');

function list() {
    return Promise.denodeify(Models.ContactModel.find.bind(Models.ContactModel))()
    .then(function (tags) {
      return tags;
    });
}

function detail(id){
      return get(id)
          .then(function(contactModel){
            return contactModel;
          });
}

function create(data){

        	var ContactModel = new Models.ContactModel({
            		name: data.name,
            		email: data.email,
                subject: data.subject,
                message: data.message
            	});
            	
            	return Promise.denodeify(ContactModel.save.bind(ContactModel))()
                .then(function (contactModel) {
            		    return contactModel;
                });
                 
}

function update(id, data) {

      return get(id)
        .then(function (contact) {
            contact.name = data.name,
            contact.email = data.email,
            contact.subject = data.subject,
            contact.message = data.message

            return Promise.denodeify(tag.save.bind(tag))()
        })
        .then(function (tag) {
          return tag;
        });

}
  
function remove(id) {
    return Promise.denodeify(Models.ContactModel.remove.bind(Models.ContactModel))({ _id: id })
    .then(function () {
      return;
    })
}

function get(id) {
    return Promise.denodeify(Models.ContactModel.findById.bind(Models.ContactModel))(id)
    .then(function (model) {
      return model;
    });
}


module.exports = {
	list:list,
	detail:detail,
	create:create,
	update:update,
  remove:remove,
  get:get
}