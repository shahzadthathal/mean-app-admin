
//Setting service

var Promise = require('promise');
var Models  =  require('../models');

function list() {
    return Promise.denodeify(Models.SettingModel.find.bind(Models.SettingModel))()
    .then(function (settings) {
      return settings;
    });
}

function detail(id){
    return get(id)
          .then(function(settingModel){
            return settingModel;
          });
}

function create(data){

      	var SettingModel = new Models.SettingModel({
      		facebook_appid: data.facebook_appid,
      		facebook_url: data.facebook_url,
          google_url: data.google_url,
          linkedin_id: data.linkedin_id,
          twitter_url: data.twitter_url,
          pinit_url: data.pinit_url
      	});
      	
      	return Promise.denodeify(SettingModel.save.bind(SettingModel))()
          .then(function (settingModel) {
      		    return settingModel;
          });       
}


function update(id, data) {
       return get(id)
          .then(function (setting) {
              setting.facebook_appid = data.facebook_appid,
              setting.facebook_url = data.facebook_url,
              setting.google_url = data.google_url,
              setting.linkedin_id = data.linkedin_id,
              setting.twitter_url = data.twitter_url,
              setting.pinit_url = data.pinit_url
              return Promise.denodeify(setting.save.bind(setting))()
          })
          .then(function (setting) {
            return setting;
          });
}
  
function remove(id) {
    return Promise.denodeify(Models.SettingModel.remove.bind(Models.SettingModel))({ _id: id })
    .then(function () {
      return;
    })
}

function get(id) {
    return Promise.denodeify(Models.SettingModel.findById.bind(Models.SettingModel))(id)
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