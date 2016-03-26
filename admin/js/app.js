
var adminApp = angular.module('adminApp', [
	'ngRoute', 
	'datatables',
	'ngAnimate',
	'ui.bootstrap',
	'angularSpinner',
	'textAngular',
	'angular-loading-bar'
	]);

adminApp.constant('SERVERURL', 'http://localhost:3003');

adminApp.config(['$routeProvider', function($routeProvider){
		$routeProvider
			.when('/admin', {
				redirectTo: '/admin/dashboard'
			})
			.when('/admin/login',{
				  templateUrl: 'partials/login.html',
				  controller: 'LoginCtrl'
			})
			.when('/admin/dashboard', {
				  templateUrl: 'partials/dashboard.html',
				  controller: 'MainCtrl'
			})
			.when('/admin/product-manager',{
				templateUrl: 'partials/products.html',
				controller: 'ProductCtrl'
			})
			.when('/admin/product-category-manager', {
				templateUrl: 'partials/products-category.html',
				controller: 'ProductCategoryCtrl'
			})
			.when('/admin/tag-manager',{
				templateUrl: 'partials/tags.html',
				controller: 'TagCtrl'
			})
			.when('/admin/blog-manager',{
				templateUrl: 'partials/blogs.html',
				controller: 'BlogCtrl'
			})
			.when('/admin/blog-category-manager',{
				templateUrl: 'partials/blog-category.html',
				controller: 'BlogCategoryCtrl'
			})
			.when('/admin/page-manager', {
				templateUrl: 'partials/pages.html',
				controller: 'PageCtrl'	
			})
			.when('/admin/profile',{
				templateUrl: 'partials/profile.html',
				controller: 'ProfileCtrl'
			})
			.when('/admin/logout', {
				template: '', //A template or templateUrl is required by AngularJS, even if your controller always redirects.
				controller: 'LogoutCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});

}]);

adminApp.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
  }])