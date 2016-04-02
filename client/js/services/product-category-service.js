
clientApp.factory('productCategoryService', function ($http, AppConfig) {
  return {
    list: function () {
      return $http.get(AppConfig.SERVERURL + '/api/product-category/list')
      .then(function (result) {
        return result.data;
      });
    }

  }
});