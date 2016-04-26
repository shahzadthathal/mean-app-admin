'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:BlogCtrl
 * @description
 * # BlogCtrl
 * Controller of the clientApp
 */

  
var BlogCtrl =   clientApp.controller('BlogCtrl', ['$scope', '$route', '$http', 'AppConfig', 'usSpinnerService', '$rootScope', 'MetaService', '$localStorage', 'getData', function ($scope, $route, $http, AppConfig, usSpinnerService, $rootScope, MetaService, $localStorage, getData) {

    usSpinnerService.spin('spinner-1');
    $scope.shopName = AppConfig.APP_NAME;
    $rootScope.metaservice = MetaService;
    $rootScope.metaservice.set($scope.shopName+"| Blog","Our blog","blog");

    //$scope.blogs = [];
    $scope.blogs = getData;
    $scope.blogParentCats = [];
    $scope.blogSubCats = [];    

	  $scope.products = [];
    $scope.imageUrl = AppConfig.SERVERURL+'/images/';
    
    /*
    if($localStorage.blogs){
        $scope.blogs = $localStorage.blogs;
    }
    else{

      */
        /*
        $http.get(AppConfig.SERVERURL + '/api/blog/list')
          .then(function (result) {
            $scope.blogs =  result.data;
            $localStorage.blogs = result.data;
        });
        */
        
    //}

    /*
     if($localStorage.blogParentCats){

        $scope.blogParentCats = $localStorage.blogParentCats;
        $scope.blogSubCats =  $localStorage.blogSubCats;
    }
    else{
    */    
            $http.get(AppConfig.SERVERURL + '/api/category/cat-list-by-type/blog')
                      .then(function(result){
                        var j = 0; var k = 0;
                        for(var i = 0; i<result.data.length; i++)
                        {
                            if(result.data[i].parentID === null){
                               $scope.blogParentCats[j] = result.data[i];
                               j++;
                            }
                            else{
                               $scope.blogSubCats[k] = result.data[i];
                               k++;
                            }
                        }

                $localStorage.blogParentCats = $scope.blogParentCats;
                $localStorage.blogSubCats = $scope.blogSubCats;
            });
    //}

    /*
    if($localStorage.products){
       $scope.products = $localStorage.products;
    }
    else{
    */

         $http.get(AppConfig.SERVERURL + '/api/product/list')
          .then(function (result) {
            $scope.products =  result.data;
            $localStorage.products = result.data;
        });
        
    //}
     
    usSpinnerService.stop('spinner-1');

}]);
