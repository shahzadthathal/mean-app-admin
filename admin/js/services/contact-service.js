adminApp.factory('ContactSrvc', function ($http) {
  return {
     detail:function(id){
      return $http.get('/api/contact/detail-by-id/'+ id)
      .then(function (result) {
        return result.data;
      });
    },
    getContacts: function () {
      return $http.get('/api/contact/list')
      .then(function (result) {
        return result.data;
      });
    },
    create: function (contact) {
      return $http.post('/api/contact/create', contact)
      .then(function (result) {
        return result.data;
      });
    },
    update: function (contact) {
      return $http.put('/api/contact/update/' + contact._id, contact)
      .then(function (result) {
        return result.data;
      });
    },
    delete: function (id) {
      return $http.delete('/api/contact/delete/' + id)
      .then(function () {
        return;
      }); 
    }    
  }
});