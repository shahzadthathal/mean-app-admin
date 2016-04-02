
clientApp.factory('productByCategoryService', function ($http, AppConfig) {
  return {
    getProductByCategory:function(id){
      return $http.get(AppConfig.SERVERURL + '/api/product/listbycat'+ id)
              .then(function(result){
                return result.data;
              });
     }
    }
});