adminApp.controller('LoginCtrl', ['$scope', '$location', '$window', 'UserSrvc', function ($scope, $location, $window, UserSrvc) {
 
  $scope.showErrMsg = false;

  $scope.login = function(user) {

    if(typeof user == "undefined"){
          $scope.errorMessage  = "Please fillout the form carefully.";
           $scope.showErrMsg = true;
          return;
    }    
    
    UserSrvc.login(user)
    .then(function (result) {
        if (result.error) {
          $scope.errorMessage = result.error;
          $scope.showErrMsg = true;
          return;   
        }

      $window.sessionStorage.token = result.token;
      $location.url('/admin/product-manager'); 

    }, function (error) {
      $scope.errorMessage = 'Error on login: '+error;
      $scope.showErrMsg = true;
    })
  }  
}]);