adminApp.factory('CategorySrvc', function ($http) {
  return {
    getCategory: function () {
      return $http.get('/api/category/list')
      .then(function (result) {
        return result.data;
      });
    },
    getParentCategory: function(){
      return $http.get('/api/category/parent-cat-list')
      .then(function (result) {
        return result.data;
      });
    },

    getParentProductCategory: function(type){
      return $http.get('/api/category/parent-product-cat-list/'+type)
      .then(function (result) {
        return result.data;
      });
    },

     getParentBlogCategory: function(type){
      return $http.get('/api/category/parent-blog-cat-list/'+type)
      .then(function (result) {
        return result.data;
      });
    },


    getSubCategory: function(catID){
      return $http.get('/api/category/sub-cat-list/'+catID)
      .then(function (result) {
        return result.data;
      });
    },
    

    create: function (category) {
      return $http.post('/api/category/create', category)
      .then(function (result) {
        return result.data;
      });
    },
    update: function (category) {
      return $http.put('/api/category/update/' + category._id, category)
      .then(function (result) {
        return result.data;
      });
    },
    delete: function (category) {
      return $http.delete('/api/category/delete/' + category._id, category)
      .then(function () {
        return;
      }); 
    }    
  }
});