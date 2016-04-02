'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:BlogDetailCtrl
 * @description
 * # BlogDetailCtrl
 * Controller of the clientApp
 */
var BlogDetailCtrl =   clientApp.controller('BlogDetailCtrl', ['$scope', '$route', '$http', 'AppConfig', 'usSpinnerService', '$rootScope', 'MetaService', function ($scope, $route, $http, AppConfig, usSpinnerService, $rootScope, MetaService) {

	usSpinnerService.spin('spinner-1');
  $scope.shopName = AppConfig.APP_NAME;
  $rootScope.metaservice = MetaService;
  
	$scope.blogDetail = {};
	$scope.blogs = [];
	$scope.blogcats = [];
	$scope.imageUrl = AppConfig.SERVERURL+'/images/';
  
	var bslug = $route.current.params.bslug;
	$http.get(AppConfig.SERVERURL + '/api/blog/detail/'+ bslug)
            .then(function(result){
                $scope.blogDetail = result.data;
                $rootScope.metaservice.set($scope.shopName+"|"+$scope.blogDetail.title,"desc 123","blah blah");

                $http.get(AppConfig.SERVERURL + '/api/blog/list')
                .then(function (result) {
                  $scope.blogs =  result.data;
                   var removeIndex = $scope.blogDetail._id;
                    $scope.blogs.splice(removeIndex,1);
                });
  });


	

    $http.get(AppConfig.SERVERURL + '/api/blog-category/list')
              .then(function(result){
                $scope.blogcats =  result.data;
    });

    usSpinnerService.stop('spinner-1');

}]); 