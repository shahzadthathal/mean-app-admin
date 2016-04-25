'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:PaymentMethodCtrl
 * @description
 * # PaymentMethodCtrl
 * Controller of the clientApp
 */
var PaymentMethodCtrl =   clientApp.controller('PaymentMethodCtrl', ['$scope', '$sce', '$route', '$http', 'AppConfig', 'usSpinnerService', '$rootScope', 'MetaService', '$localStorage', function ($scope, $sce, $route, $http, AppConfig, usSpinnerService, $rootScope, MetaService, $localStorage) {
    
    usSpinnerService.spin('spinner-1');
    $scope.shopName = AppConfig.APP_NAME;
    
    $rootScope.metaservice = MetaService;
    $rootScope.metaservice.set($scope.shopName+" | Payment Methods","Payment method description","payment methods,webshop");
    $scope.breadcrumbs = 'Payment methods';

    $scope.productParentCats = [];
    $scope.productSubCats = [];


     $http.get(AppConfig.SERVERURL + '/api/page/detail/payment-method')
      .then(function (result) {
        $scope.pageData =  result.data;
    })
    .catch(function(e){
	  	console.log(e);
	  	usSpinnerService.stop('spinner-1');
	});


	 /*
   if($localStorage.productParentCats){

        $scope.productParentCats = $localStorage.productParentCats;
        $scope.productSubCats =  $localStorage.productSubCats;
    }
    else{

     */ 
        
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
   // }

		$scope.renderHtml = function(html_code)
		{
		    return $sce.trustAsHtml(html_code);
		};

    usSpinnerService.stop('spinner-1');

  }]);
