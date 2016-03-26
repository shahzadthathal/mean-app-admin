adminApp.factory('BlogSrvc', function ($http) {
  return {
    getBlogs: function () {
      return $http.get('/api/blog/list')
      .then(function (result) {
        return result.data;
      });
    },
    create: function (blog) {
      return $http.post('/api/blog/create', blog)
      .then(function (result) {
        return result.data;
      });
    },
    update: function (blog) {
      return $http.put('/api/blog/update/' + blog._id, blog)
      .then(function (result) {
        return result.data;
      });
    },
    delete: function (blog) {
      return $http.delete('/api/blog/delete/' + blog._id, blog)
      .then(function () {
        return;
      }); 
    }    
  }
});