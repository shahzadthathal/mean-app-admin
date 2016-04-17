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
    'angular-loading-bar',
    'ngStorage'
  ]);
  

  clientApp.constant('AppConfig', {
    'APP_NAME' : 'Web Shop',
    'APP_VERSION' : '1.0.0',
    'SERVERURL': 'http://localhost:3003',
    //'SERVERURL': 'https://mean-app-admin.herokuapp.com',
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
      .when('/blog', {
        templateUrl: 'partials/blog.html',
        controller: 'BlogCtrl'
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
      .when('/term', {
        templateUrl: 'partials/term.html',
        controller: 'TermCtrl'
      })
      .when('/:slug',{
        templateUrl: 'partials/common.html',
        controller: 'CommonCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    // use the HTML5 History API
      $locationProvider.html5Mode(true);
     
     // prevent preflight request for cross-domain Ajax calls
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

  });

  clientApp.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
  }])