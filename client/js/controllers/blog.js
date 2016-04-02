'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:BlogCtrl
 * @description
 * # BlogCtrl
 * Controller of the clientApp
 */

  
var BlogCtrl =   clientApp.controller('BlogCtrl', ['$scope', '$route', '$http', 'AppConfig', 'usSpinnerService', '$rootScope', 'MetaService', function ($scope, $route, $http, AppConfig, usSpinnerService, $rootScope, MetaService) {

    usSpinnerService.spin('spinner-1');
    $scope.shopName = AppConfig.APP_NAME;
    $rootScope.metaservice = MetaService;
    $rootScope.metaservice.set($scope.shopName+"| Blog","desc 123","blah blah");

    $scope.blogs = [];
    $scope.blogcats = [];
	$scope.products = [];
    $scope.imageUrl = AppConfig.SERVERURL+'/images/';
    
    $http.get(AppConfig.SERVERURL + '/api/blog/list')
      .then(function (result) {
        $scope.blogs =  result.data;
    });
      
    $http.get(AppConfig.SERVERURL + '/api/blog-category/list')
              .then(function(result){
                $scope.blogcats =  result.data;
    });

    $http.get(AppConfig.SERVERURL + '/api/product/list')
      .then(function (result) {
        $scope.products =  result.data;
    });
         
    usSpinnerService.stop('spinner-1');

}]);
