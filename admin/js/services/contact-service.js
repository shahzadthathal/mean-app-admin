adminApp.factory('ContactSrvc', function ($http) {
  return {
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
    delete: function (contact) {
      return $http.delete('/api/contact/delete/' + contact._id, contact)
      .then(function () {
        return;
      }); 
    }    
  }
});