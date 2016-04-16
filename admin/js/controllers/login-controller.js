adminApp.controller('LoginCtrl', ['$scope', '$location', '$window', 'UserSrvc', 'Notification', function ($scope, $location, $window, UserSrvc, Notification) {
 
  $scope.showErrMsg = false;

  $scope.login = function(user) {

    if(typeof user == "undefined"){
          $scope.errorMessage  = "Please fillout the form carefully.";
           $scope.showErrMsg = true;
          Notification.error({message: 'Please fillout the form carefully!', delay: 3000});
                
          return;
    }    
    
    UserSrvc.login(user)
    .then(function (result) {
        if (result.error) {
          $scope.errorMessage = result.error;
          $scope.showErrMsg = true;
          Notification.error({message:  $scope.errorMessage, delay: 3000});
          return;   
        }

      Notification.success({message:  'Logged in successfully!', delay: 1000});        
      $window.sessionStorage.token = result.token;
      $location.url('/admin/product-manager'); 

    }, function (error) {
      $scope.errorMessage = 'Error on login: '+error;
      $scope.showErrMsg = true;
    })
  }  
}]);