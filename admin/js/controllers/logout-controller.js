
adminApp.controller('LogoutCtrl', ['$location', '$window', function($location, $window){
	
	$window.sessionStorage.token = null;
	$location.path('/admin/login');
	
}]);
