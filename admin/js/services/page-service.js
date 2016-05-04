adminApp.factory('PageSrvc', function ($http) {
  return {
     detail:function(id){
      return $http.get('/api/page/detail-by-id/'+ id)
      .then(function (result) {
        return result.data;
      });
    },

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
    delete: function (id) {
      return $http.delete('/api/page/delete/' + id)
      .then(function () {
        return;
      }); 
    }    
  }
});