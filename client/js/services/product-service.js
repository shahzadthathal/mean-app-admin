
clientApp.factory('productService', function ($http, AppConfig) {
  return {
    getProducts: function () {
      return $http.get(AppConfig.SERVERURL + '/api/product/list')
      .then(function (result) {
        return result.data;
      });
    },
    getProductDetail:function(slug){
      return $http.get(AppConfig.SERVERURL + '/api/product/detail/'+ slug)
            .then(function(result){
                return result.data;
            });
    }
  }
});