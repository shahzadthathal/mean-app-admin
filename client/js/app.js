'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
var clientApp = angular.module('clientApp', [
    'ngCookies',
    'ngResource',
    'ngRoute',
    'angularSpinner',
    'angular-loading-bar'
  ]);
  
  //'SERVERURL': 'http://localhost:3003',
  clientApp.constant('AppConfig', {
    'APP_NAME' : 'Web Shop',
    'APP_VERSION' : '1.0.0',
    'SERVERURL': 'https://mean-app-admin.herokuapp.com',
    'GOOGLE_ANALYTICS_ID' : '',
    'BASE_URL' : '',
    'META_TITLE': 'Web Shop'
   });
  clientApp.config(function ($routeProvider, $locationProvider, $httpProvider) {
    
    $routeProvider
      .when('/', {
        templateUrl: 'partials/main.html',
        controller: 'MainCtrl'
      })
      .when('/product-detail/:pslug', {
        templateUrl:  'partials/product-detail.html',
        controller:   'ProductDetailCtrl'
      })
      .when('/product-category/:cslug', {
        templateUrl: 'partials/product-category.html',
        controller: 'ProductCategoryCtrl'        
      })
      .when('/tag/:tslug', {
        templateUrl: 'partials/tag.html',
        controller: 'TagCtrl'
      })
      .when('/blog', {
        templateUrl: 'partials/blog.html',
        controller: 'BlogCtrl'
      })
      .when('/blog-detail/:bslug', {
        templateUrl: 'partials/blog-detail.html',
        controller: 'BlogDetailCtrl'
      })
      .when('/blog-category/:bcslug', {
        templateUrl: 'partials/blog-category.html',
        controller: 'BlogCategoryCtrl'
      })
      .when('/payment-methods', {
        templateUrl: 'partials/payment-methods.html',
        controller: 'PaymentMethodCtrl'
      })
      .when('/contact', {
        templateUrl: 'partials/contact.html',
        controller: 'ContactCtrl'
      })
      .when('/about', {
        templateUrl: 'partials/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    // use the HTML5 History API
      //$locationProvider.html5Mode(true);
     
     // prevent preflight request for cross-domain Ajax calls
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

  });

  clientApp.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
  }])