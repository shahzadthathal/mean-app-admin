'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ProductDetailCtrl
 * @description
 * # ProductDetailCtrl
 * Controller of the clientApp
 */
var ProductDetailCtrl =   clientApp.controller('ProductDetailCtrl', ['$scope', '$route', '$http', 'AppConfig', 'usSpinnerService', '$rootScope', 'MetaService', function ($scope, $route, $http, AppConfig, usSpinnerService, $rootScope, MetaService) {

	usSpinnerService.spin('spinner-1');
  $scope.shopName = AppConfig.APP_NAME;
  //$scope.productDetail = {};
  $rootScope.metaservice = MetaService;
  
	
	$scope.products = [];
	$scope.productcats = [];
   $scope.imageUrl = AppConfig.SERVERURL+'/images/';
	
	var pslug = $route.current.params.pslug;

	$http.get(AppConfig.SERVERURL + '/api/product/detail/'+ pslug)
            .then(function(result){
                $scope.productDetail = result.data;
                $rootScope.metaservice.set("Products | "+ $scope.productDetail.title,"desc 123","blah blah");
     
                $http.get(AppConfig.SERVERURL + '/api/product/list')
                  .then(function (result) {
                    $scope.products =  result.data;
                    var removeIndex = $scope.productDetail._id;
                    $scope.products.splice(removeIndex,1);

                });

     });

	

    $http.get(AppConfig.SERVERURL + '/api/product-category/list')
              .then(function(result){
                $scope.productcats =  result.data;
    });

          
    usSpinnerService.stop('spinner-1');

}]);
