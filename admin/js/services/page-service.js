adminApp.factory('PageSrvc', function ($http) {
  return {
    getPages: function () {
      return $http.get('/api/page/list')
      .then(function (result) {
        return result.data;
      });
    },
    create: function (page) {
      return $http.post('/api/page/create', page)
      .then(function (result) {
        return result.data;
      });
    },
    update: function (page) {
      return $http.put('/api/page/update/' + page._id, page)
      .then(function (result) {
        return result.data;
      });
    },
    delete: function (page) {
      return $http.delete('/api/page/delete/' + page._id, page)
      .then(function () {
        return;
      }); 
    }    
  }
});