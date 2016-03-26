adminApp.factory('BlogCategorySrvc', function ($http) {
  return {
    getBlogCategory: function () {
      return $http.get('/api/blog-category/list')
      .then(function (result) {
        return result.data;
      });
    },
    create: function (blogCategory) {
      return $http.post('/api/blog-category/create', blogCategory)
      .then(function (result) {
        return result.data;
      });
    },
    update: function (blogCategory) {
      return $http.put('/api/blog-category/update/' + blogCategory._id, blogCategory)
      .then(function (result) {
        return result.data;
      });
    },
    delete: function (blogCategory) {
      return $http.delete('/api/blog-category/delete/' + blogCategory._id, blogCategory)
      .then(function () {
        return;
      }); 
    }    
  }
});