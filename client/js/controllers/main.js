'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */

  
var MainCtrl =   clientApp.controller('MainCtrl', ['$scope', '$http', 'AppConfig', 'usSpinnerService', '$rootScope', 'MetaService', function ($scope, $http, AppConfig, usSpinnerService, $rootScope, MetaService) {

    usSpinnerService.spin('spinner-1');
    $scope.shopName = AppConfig.APP_NAME;

    $rootScope.metaservice = MetaService;
    $rootScope.metaservice.set($scope.shopName+" | Products","Product description","products,webshop");

/*    $scope.itemsPerPage = 2; 
    $scope.currentPage = 0;

$scope.range = function() {

         var rangeSize = 4;

         var ps = [];

         var start;

         start = $scope.currentPage;

         if ( start > $scope.pageCount()-rangeSize ) {

          start = $scope.pageCount()-rangeSize+1;

          }

         for (var i=start; i<start+rangeSize; i++) {

         ps.push(i);

        }

    return ps;

};

$scope.prevPage = function() {

if ($scope.currentPage > 0) {

$scope.currentPage--;

}
};

$scope.DisablePrevPage = function() {

return $scope.currentPage === 0 ? "disabled" : "";

};

$scope.pageCount = function() {

return Math.ceil($scope.products.length/$scope.itemsPerPage)-1;

};

$scope.nextPage = function() {

if ($scope.currentPage > $scope.pageCount()) {

$scope.currentPage++;

}
};

$scope.DisableNextPage = function() {

return $scope.currentPage === $scope.pageCount() ? "disabled" : "";

};

$scope.setPage = function(n) {

$scope.currentPage = n;

};

*/

    $scope.products = [];
    $scope.productcats = [];    
    $scope.imageUrl = AppConfig.SERVERURL+'/images/';


    $http.get(AppConfig.SERVERURL + '/api/product/list')
      .then(function (result) {
        $scope.products =  result.data;
    });
      
    $http.get(AppConfig.SERVERURL + '/api/product-category/list')
              .then(function(result){
                $scope.productcats =  result.data;
    });
         
    usSpinnerService.stop('spinner-1');

}]);
