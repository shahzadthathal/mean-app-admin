adminApp.factory('ProductCategorySrvc', function ($http) {
  return {
    getProductCategory: function () {
      return $http.get('/api/product-category/list')
      .then(function (result) {
        return result.data;
      });
    },
    create: function (productCategory) {
      return $http.post('/api/product-category/create', productCategory)
      .then(function (result) {
        return result.data;
      });
    },
    update: function (productCategory) {
      return $http.put('/api/product-category/update/' + productCategory._id, productCategory)
      .then(function (result) {
        return result.data;
      });
    },
    delete: function (productCategory) {
      return $http.delete('/api/product-category/delete/' + productCategory._id, productCategory)
      .then(function () {
        return;
      }); 
    }    
  }
});