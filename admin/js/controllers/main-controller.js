var MainCtrl = adminApp.controller('MainCtrl', ['$scope', 'UserSrvc', '$location', '$route', '$window', 'Notification', function($scope, UserSrvc, $location, $route, $window, Notification){

	if (!$window.sessionStorage.token || $window.sessionStorage.token == 'null') { 
		$location.url('/admin/login')
		return;    
  	}
	
	$scope.user = {};
	UserSrvc.me()
  		.then(function (user){
    		$scope.user = user;
  		});

  	$scope.logout = function(){
  		alert('testing here');
  	}	
		
}]);