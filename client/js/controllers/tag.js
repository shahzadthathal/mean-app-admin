'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:TagCtrl
 * @description
 * # ProductTagCtrl
 * Controller of the clientApp
 */


var TagCtrl =   clientApp.controller('TagCtrl', ['$scope', '$route', '$http', 'AppConfig', 'usSpinnerService', '$rootScope', 'MetaService', function ($scope, $route, $http, AppConfig, usSpinnerService, $rootScope, MetaService) {
 
  usSpinnerService.spin('spinner-1');
  $scope.shopName = AppConfig.APP_NAME;
  $rootScope.metaservice = MetaService;

  $scope.tagDetail = {};
	$scope.products = [];
  $scope.blogs = [];
	$scope.productcats = [];
  $scope.imageUrl = AppConfig.SERVERURL+'/images/';
	
	var tslug = $route.current.params.tslug;

	 $http.get(AppConfig.SERVERURL + '/api/tag/detail/'+ tslug)
              .then(function(result){
                $scope.tagDetail = result.data;
          $rootScope.metaservice.set("Tags | "+ $scope.tagDetail.title,"desc 123","blah blah");
                
    });



    $http.get(AppConfig.SERVERURL + '/api/product-category/list')
              .then(function(result){
                $scope.loading++;
                $scope.productcats =  result.data;
    });
              

    $http.get(AppConfig.SERVERURL + '/api/product/list-by-tag/'+ tslug)
      .then(function (result) {
        $scope.products =  result.data;
    });


    $http.get(AppConfig.SERVERURL + '/api/blog/list-by-tag/'+ tslug)
      .then(function (result) {
        $scope.blogs =  result.data;
    });

	 usSpinnerService.stop('spinner-1');


}]);

