'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:CommonCtrl
 * @description
 * # CommonCtrl
 * Controller of the clientApp
 */
var CommonCtrl =   clientApp.controller('CommonCtrl', ['$scope', '$route', '$http', 'AppConfig', 'usSpinnerService', '$rootScope', 'MetaService', '$localStorage', function ($scope, $route, $http, AppConfig, usSpinnerService, $rootScope, MetaService, $localStorage) {

	usSpinnerService.spin('spinner-1');
  $scope.shopName         = AppConfig.APP_NAME;
  $rootScope.metaservice  = MetaService;
  $scope.imageUrl         = AppConfig.SERVERURL+'/images/';

  $scope.showProductDetailArea          = false;
  $scope.showProductCategory            = false;
  $scope.showProductCategoryDetailArea  = false;

  $scope.showBlogDetailArea             = false;
  $scope.showBlogCategory               = false;
  $scope.showBlogCategoryDetailArea     = false;  
	
	$scope.products              = [];
  $scope.productParentCats     = [];
  $scope.productSubCats        = [];

  $scope.blogs                 = [];
  $scope.blogParentCats        = [];
  $scope.blogSubCats           = [];
  
	
	var slug = $route.current.params.slug;
  $scope.slug = slug;

  $http.get(AppConfig.SERVERURL+'/api/common/'+slug)
  .then(function(result){

    if(result.data.post_type == 'product'){
       $scope.productDetail = result.data;
       $rootScope.metaservice.set("Product | "+$scope.productDetail.title, $scope.productDetail.short_description ,"products,webshop");
       $scope.showProductDetailArea  = true;
       $scope.showProductCategory  = true;
       $scope.breadcrumbs = $scope.productDetail.title;

       $http.get(AppConfig.SERVERURL + '/api/product/listbycat/'+ $scope.productDetail.category)
       .then(function(result){
          $scope.products = result.data;
          var removeIndex = $scope.products.indexOf($scope.productDetail);  
          $scope.products.splice(removeIndex, 1);
       });
      
    }
    else if(result.data.post_type == 'product_catgory'){
        $scope.productCategoryDetail = result.data;
        $rootScope.metaservice.set("Category | "+$scope.productCategoryDetail.title,"Product category description","products,webshop");
        $scope.showProductCategory  = true;
        $scope.showProductCategoryDetailArea = true;
        $scope.breadcrumbs = $scope.productCategoryDetail.title;
        $http.get(AppConfig.SERVERURL + '/api/product/listbycatslug/'+ slug)
                      .then(function(result){
                        $scope.products =  result.data;
        });
    }
    else if(result.data.post_type == 'tag'){
     
      $scope.tagDetail = result.data;
      $rootScope.metaservice.set("Tags | "+$scope.tagDetail.title, $scope.tagDetail.description,"tags");
      $scope.showTagDetailArea       = true;
      $scope.showProductCategory     = true;
      $scope.breadcrumbs = $scope.tagDetail.title;

        $http.get(AppConfig.SERVERURL + '/api/product/list-by-tag/'+ slug)
          .then(function (result) {
            $scope.products =  result.data;
        });


        $http.get(AppConfig.SERVERURL + '/api/blog/list-by-tag/'+ slug)
          .then(function (result) {
            $scope.blogs =  result.data;
        });

    }
    else if(result.data.post_type == 'blog'){
      
      $scope.blogDetail = result.data;
      $rootScope.metaservice.set("Blog | "+$scope.blogDetail.title, $scope.blogDetail.short_description ,"blog,webshop");
      $scope.showBlogDetailArea  = true;
      $scope.showBlogCategory  = true;
      $scope.breadcrumbs = $scope.blogDetail.title;


       $http.get(AppConfig.SERVERURL + '/api/blog/listbycat/'+ $scope.blogDetail.category)
       .then(function(result){
          $scope.blogs = result.data;
          var removeIndex = $scope.blogs.indexOf($scope.blogDetail);  
          $scope.blogs.splice(removeIndex, 1);
       });

    }
    else if(result.data.post_type == 'blog_category'){
      
        $scope.blogCategoryDetail = result.data;
        $rootScope.metaservice.set("Category | "+$scope.blogCategoryDetail.title,"Blog category","blog,webshop");
        $scope.showBlogCategory  = true;
        $scope.showBlogCategoryDetailArea = true;
        $scope.breadcrumbs = $scope.blogCategoryDetail.title;
        $http.get(AppConfig.SERVERURL + '/api/blog/listbycatslug/'+ slug)
                      .then(function(result){
                        $scope.blogs =  result.data;
        });
    }


  });



    if($localStorage.productParentCats){

        $scope.productParentCats = $localStorage.productParentCats;
        $scope.productSubCats =  $localStorage.productSubCats;
    }
    else{
        
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
    }


    if($localStorage.blogParentCats){

        $scope.blogParentCats = $localStorage.blogParentCats;
        $scope.blogSubCats =  $localStorage.blogSubCats;
    }
    else{
        
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
                $localStorage.blogSubCats    = $scope.blogSubCats;
            });
    }



          
    usSpinnerService.stop('spinner-1');

}]);
