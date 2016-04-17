
var adminApp = angular.module('adminApp', [
	'ngRoute', 
	'datatables',
	'ngAnimate',
	'ui.bootstrap',
	'angularSpinner',
	'textAngular',
	'angular-loading-bar',
	'ui-notification'
	]);

adminApp.constant('SERVERURL', 'http://localhost:3003');
//adminApp.constant('SERVERURL', 'https://mean-app-admin.herokuapp.com');

adminApp.config(['$routeProvider', function($routeProvider){
		$routeProvider
		   .when('/',{
		   		redirectTo: '/admin/dashboard'
		   })
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
			.when('/admin/category-manager', {
				templateUrl: 'partials/category.html',
				controller: 'CategoryCtrl'
			})
			.when('/admin/tag-manager',{
				templateUrl: 'partials/tags.html',
				controller: 'TagCtrl'
			})

			.when('/admin/tag-related/:slug',{
				templateUrl: 'partials/tag_related.html',
				controller: 'TagRelatedCtrl'
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