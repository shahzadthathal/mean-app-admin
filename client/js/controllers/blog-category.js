'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:BlogCategoryCtrl 
 * @description
 * # BlogCategoryCtrl
 * Controller of the clientApp
 */


var BlogCategoryCtrl =   clientApp.controller('BlogCategoryCtrl', ['$scope', '$route', '$http', 'AppConfig', 'usSpinnerService', '$rootScope', 'MetaService', function ($scope, $route, $http, AppConfig, usSpinnerService, $rootScope, MetaService) {
 
  usSpinnerService.spin('spinner-1');
  $scope.shopName = AppConfig.APP_NAME;
  $rootScope.metaservice = MetaService;
  
  $scope.categoryDetail = {};
  $scope.blogs = [];
  $scope.blogcats = [];
  $scope.imageUrl = AppConfig.SERVERURL+'/images/';
	
	var bcslug = $route.current.params.bcslug;

	$http.get(AppConfig.SERVERURL + '/api/blog-category/detail/'+ bcslug)
              .then(function(result){
                $scope.categoryDetail = result.data;
                $rootScope.metaservice.set("Blog | "+ $scope.categoryDetail.title,"desc 123","blah blah");

    });

	$http.get(AppConfig.SERVERURL + '/api/blog/listbycatslug/'+ bcslug)
              		.then(function(result){
                		$scope.blogs =  result.data;
    });

    $http.get(AppConfig.SERVERURL + '/api/blog-category/list')
              .then(function(result){
                $scope.blogcats =  result.data;
    });

	usSpinnerService.stop('spinner-1');

}]);
