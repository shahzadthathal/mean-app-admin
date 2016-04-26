
clientApp.factory('blogService', function ($http, AppConfig) {
  return {
    getBlogs: function () {
      return $http.get(AppConfig.SERVERURL + '/api/blog/list')
      .then(function (result) {
        return result.data;
      });
    },
    getBlogDetail:function(slug){
      return $http.get(AppConfig.SERVERURL + '/api/blog/detail/'+ slug)
            .then(function(result){
                return result.data;
            });
    }
  }
});