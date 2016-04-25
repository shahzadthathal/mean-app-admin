'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */

  
var MainCtrl =   clientApp.controller('MainCtrl', ['$scope', '$http', 'AppConfig', 'usSpinnerService', '$rootScope', 'MetaService', '$localStorage', function ($scope, $http, AppConfig, usSpinnerService, $rootScope, MetaService, $localStorage) {

    usSpinnerService.spin('spinner-1');
    $scope.shopName = AppConfig.APP_NAME;

    $rootScope.metaservice = MetaService;
    $rootScope.metaservice.set($scope.shopName+" | Products","Product description","products,webshop");

    $scope.products = [];
    $scope.productParentCats = [];
    $scope.productSubCats = [];

    $scope.homePagePosts = [];
    $scope.blogParentCats = [];
    $scope.blogSubCats = [];    

    $scope.imageUrl = AppConfig.SERVERURL+'/images/';

   /* if($localStorage.homePagePosts){
        $scope.homePagePosts = $localStorage.homePagePosts;
    }
    else{
    */    

         $http.get(AppConfig.SERVERURL + '/api/blog/list')
          .then(function (result) {
            $scope.homePagePosts =  result.data;
            $localStorage.homePagePosts = result.data;
        });
        
    //}

    /*if($localStorage.products){
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

    /*
    if($localStorage.socialMedia){
        $scope.socialMedia = $localStorage.socialMedia;
    }
    else{
    */    

        $http.get(AppConfig.SERVERURL + '/api/setting/list')
        .then(function(result){
             
             $scope.socialMedia = {
                    facebook_appid:result.data[0].facebook_appid,
                    facebook_url:result.data[0].facebook_url,
                    google_url:result.data[0].google_url,
                    linkedin_id:result.data[0].linkedin_id,
                    twitter_url:result.data[0].twitter_url,
                    pinit_url:result.data[0].pinit_url
                };
                $localStorage.socialMedia = $scope.socialMedia;
        });

    //}


      
    /*if($localStorage.productParentCats){

        $scope.productParentCats = $localStorage.productParentCats;
        $scope.productSubCats =  $localStorage.productSubCats;
    }
    else{*/
        
            $http.get(AppConfig.SERVERURL + '/api/category/cat-list-by-type/product')
                      .then(function(result){
                        var j = 0; var k = 0;
                        for(var i = 0; i<result.data.length; i++)
                        {
                            if(result.data[i].parentID === null){
                               $scope.productParentCats[j] = result.data[i];
                               j++;
                            }
                            else{
                               $scope.productSubCats[k] = result.data[i];
                               k++;
                            }
                        }

                $localStorage.productParentCats = $scope.productParentCats;
                $localStorage.productSubCats = $scope.productSubCats;
            });
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



    usSpinnerService.stop('spinner-1');

}]);
