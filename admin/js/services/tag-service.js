adminApp.factory('TagSrvc', function ($http) {
  return {
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
    delete: function (tag) {
      return $http.delete('/api/tag/delete/' + tag._id, tag)
      .then(function () {
        return;
      }); 
    }    
  }
});