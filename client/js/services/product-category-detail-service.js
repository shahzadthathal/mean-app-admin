
clientApp.factory('productCategoryDetailService', function ($http, AppConfig) {
  return {
    getProductCategoryDetail:function(slug){
      console.log('Category service: '+slug);
      return $http.get(AppConfig.SERVERURL + '/api/product-category/detail/'+ slug)
            .then(function(result){
                return result.data;
            });
    }

  }
});