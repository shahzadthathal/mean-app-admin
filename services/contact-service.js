
//tag service

var Promise = require('promise');
var Models  =  require('../models');

function list(req) {
    var list = {};
   return Models.ContactModel.count()
         .then(function(total){
          list.recordsTotal = total;
          list.recordsFiltered = total;
          return Models.ContactModel.find().skip(req.query.start).limit(req.query.length).sort({_id:-1});
         })
         .then(function(results){           
           list.draw = req.query.draw;
           list.data = results;
           return list;
         });
}

function detail(id){
      return get(id)
          .then(function(contactModel){
            return contactModel;
          });
}

function detailById(id){
     return get(id)
          .then(function(blog){
            return blog;
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

            return Promise.denodeify(contact.save.bind(contact))()
        })
        .then(function (contact) {
          return contact;
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
  detailById:detailById,
	create:create,
	update:update,
  remove:remove,
  get:get
}