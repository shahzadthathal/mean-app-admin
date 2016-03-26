var MainCtrl = adminApp.controller('MainCtrl', ['$scope', 'UserSrvc', '$location', '$route', '$window', function($scope, UserSrvc, $location, $route, $window){

	if (!$window.sessionStorage.token || $window.sessionStorage.token == 'null') { 
		$location.url('/admin/login')
		return;    
  	}
	
	$scope.user = {};
	UserSrvc.me()
  		.then(function (user){
  			console.log("MainCtrl: ",user);
    		$scope.user = user;
  		});

  	$scope.logout = function(){
  		alert('testing here');
  	}	
		
}]);