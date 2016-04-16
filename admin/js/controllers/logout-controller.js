
adminApp.controller('LogoutCtrl', ['$location', '$window', 'Notification', function($location, $window, Notification){
	
	$window.sessionStorage.token = null;
	Notification.success({message: 'Logged out successfully!', delay: 1000});
	$location.path('/admin/login');
	
}]);
