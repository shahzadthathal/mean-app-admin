
adminApp.controller('TagRelatedCtrl', ['$scope', 'UserSrvc', 'BlogSrvc', 'ProductSrvc', '$location', '$route', '$window', '$uibModal', 'SERVERURL', 'usSpinnerService', function($scope, UserSrvc, BlogSrvc, ProductSrvc, $location, $route, $window, $uibModal, SERVERURL, usSpinnerService){

	$scope.imageUrl = SERVERURL+'/images/';
	$scope.products = $scope.blogs = [];
	
	var tagSlug = $route.current.params.slug;
		
	if (!$window.sessionStorage.token || $window.sessionStorage.token == 'null') { 
			$location.url('/admin/login')
			return;    
	 }

	
	usSpinnerService.spin('spinner-1');
  	return UserSrvc.me()
	  .then(function (user) {
	   		return ProductSrvc.getProductsByTag(tagSlug);
	  })
	  .then(function (products) {
	    	$scope.products = products;
	    	return BlogSrvc.getBlogsByTag(tagSlug);
	  })
	  .then(function (blogs) {
		    $scope.blogs = blogs;
		    usSpinnerService.stop('spinner-1');
		    return $scope.blogs;
	  })
	  .catch(function(e){
	  		console.log(e);
	  		usSpinnerService.stop('spinner-1');
	  });

 		
}]);

