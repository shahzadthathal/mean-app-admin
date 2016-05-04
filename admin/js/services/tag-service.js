adminApp.factory('TagSrvc', function ($http) {
  return {
    detail:function(id){
      return $http.get('/api/tag/detail-by-id/'+ id)
      .then(function (result) {
        return result.data;
      });
    },
    getTags: function () {
      return $http.get('/api/tag/list')
      .then(function (result) {
        return result.data;
      });
    },
    getBlogsByTag: function(tag){
       $http.get(AppConfig.SERVERURL + '/api/blog/list-by-tag/'+ tag)
      .then(function (result) {
        $scope.blogs =  result.data;
       });
    },
    create: function (tag) {
      return $http.post('/api/tag/create', tag)
      .then(function (result) {
        return result.data;
      });
    },
    update: function (tag) {
      return $http.put('/api/tag/update/' + tag._id, tag)
      .then(function (result) {
        return result.data;
      });
    },
    delete: function (id) {
      return $http.delete('/api/tag/delete/' + id)
      .then(function () {
        return;
      }); 
    }    
  }
});