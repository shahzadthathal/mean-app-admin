'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:PaymentMethodCtrl
 * @description
 * # PaymentMethodCtrl
 * Controller of the clientApp
 */
var PaymentMethodCtrl =   clientApp.controller('PaymentMethodCtrl', ['$scope', '$sce', '$route', '$http', 'AppConfig', 'usSpinnerService', '$rootScope', 'MetaService', function ($scope, $sce, $route, $http, AppConfig, usSpinnerService, $rootScope, MetaService) {
    
    usSpinnerService.spin('spinner-1');
    $scope.shopName = AppConfig.APP_NAME;
    
    $rootScope.metaservice = MetaService;
    $rootScope.metaservice.set($scope.shopName+"|Payment Methods","Product description","products,webshop");
    
    $scope.pageData = {};
    $scope.productcats = [];

     $http.get(AppConfig.SERVERURL + '/api/page/detail/payment-methods')
      .then(function (result) {
        $scope.pageData =  result.data;
        //return $scope.pageData;
    })
    .catch(function(e){
	  	console.log(e);
	  	usSpinnerService.stop('spinner-1');
	});


	$http.get(AppConfig.SERVERURL + '/api/product-category/list')
  		.then(function(result){
      		$scope.productcats =  result.data;
    	});

		$scope.renderHtml = function(html_code)
		{
		    return $sce.trustAsHtml(html_code);
		};

      
    usSpinnerService.stop('spinner-1');

  }]);
