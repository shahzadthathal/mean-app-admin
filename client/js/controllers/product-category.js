'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ProductCategoryCtrl
 * @description
 * # ProductCategoryCtrl
 * Controller of the clientApp
 */


var ProductCategoryCtrl =   clientApp.controller('ProductCategoryCtrl', ['$scope', '$route', '$http', 'AppConfig', 'usSpinnerService', '$rootScope', 'MetaService', function ($scope, $route, $http, AppConfig, usSpinnerService, $rootScope, MetaService) {
 
  usSpinnerService.spin('spinner-1');
  $scope.shopName = AppConfig.APP_NAME;
  $rootScope.metaservice = MetaService;
  
  $scope.categoryDetail = {};
	$scope.products = [];
	$scope.productcats = [];
  $scope.imageUrl = AppConfig.SERVERURL+'/images/';
	
	var slug = $route.current.params.cslug;

	$http.get(AppConfig.SERVERURL + '/api/product-category/detail/'+ slug)
              .then(function(result){
                $scope.categoryDetail = result.data;
                $rootScope.metaservice.set("Products | "+$scope.categoryDetail.title,"Product category description","products,webshop");
  });



	$http.get(AppConfig.SERVERURL + '/api/product/listbycatslug/'+ slug)
              		.then(function(result){
                		$scope.products =  result.data;
    });

    $http.get(AppConfig.SERVERURL + '/api/product-category/list')
              .then(function(result){
                $scope.productcats =  result.data;
    });

	usSpinnerService.stop('spinner-1');

}]);
