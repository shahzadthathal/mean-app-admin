

/**
 * @ngdoc function
 * @name clientApp.controller:TermCtrl
 * @description
 * # TermCtrl
 * Controller of the clientApp
 */

 
 var AboutCtrl =   clientApp.controller('TermCtrl', ['$scope', '$sce', '$route', '$http', 'AppConfig', 'usSpinnerService', '$rootScope', 'MetaService', function ($scope, $sce, $route, $http, AppConfig, usSpinnerService,  $rootScope, MetaService) {
    
    usSpinnerService.spin('spinner-1');
    $scope.shopName = AppConfig.APP_NAME;
    $rootScope.metaservice = MetaService;
    $rootScope.metaservice.set($scope.shopName+"| Terms & conditions","desc 123","blah blah");
   $scope.breadcrumbs = 'Terms & conditions';
     $http.get(AppConfig.SERVERURL + '/api/page/detail/term')
      .then(function (result) {
        $scope.pageData =  result.data;
        //return $scope.pageData;
    })
    .catch(function(e){
	  	console.log(e);
	  	usSpinnerService.stop('spinner-1');
	});

		$scope.renderHtml = function(html_code)
		{
		    return $sce.trustAsHtml(html_code);
		};

      
    usSpinnerService.stop('spinner-1');

  }]);
