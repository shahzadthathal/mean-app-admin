adminApp.factory('SettingSrvc', function ($http) {
  return {
    getSettings: function () {
      return $http.get('/api/setting/list')
      .then(function (result) {
        return result.data;
      });
    },
    getSettingById: function(id){
       $http.get(AppConfig.SERVERURL + '/api/setting/detail/'+ id)
      .then(function (result) {
          return  result.data;
       });
    },
    create: function (setting) {
      return $http.post('/api/setting/create', setting)
      .then(function (result) {
        return result.data;
      });
    },
    update: function (setting) {
      return $http.put('/api/setting/update/' + setting._id, setting)
      .then(function (result) {
        return result.data;
      });
    },
    delete: function (setting) {
      return $http.delete('/api/setting/delete/' + setting._id, setting)
      .then(function () {
        return;
      }); 
    }
  }
});