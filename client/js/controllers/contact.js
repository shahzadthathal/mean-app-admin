'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ContactCtrl
 * @description
 * # ContactCtrl
 * Controller of the clientApp
 */

 clientApp.controller('ContactCtrl', ['$scope', '$http', 'AppConfig', 'usSpinnerService', '$rootScope', 'MetaService',  function ($scope, $http, AppConfig, usSpinnerService, $rootScope, MetaService) {
    
    $scope.shopName = AppConfig.APP_NAME;
    $rootScope.metaservice = MetaService;
    $rootScope.metaservice.set($scope.shopName+"| Contact","desc 123","blah blah");

    $http.get(AppConfig.SERVERURL + '/api/page/detail/contact')
      .then(function (result) {
        $scope.pageData =  result.data;
        //return $scope.pageData;
    });

    $scope.renderHtml = function(html_code)
    {
        return $sce.trustAsHtml(html_code);
    };


    $scope.result = 'hidden'
    $scope.resultMessage;
    $scope.resultMessageClass;
    $scope.formData; //formData is an object holding the name, email, subject, and message
    $scope.submitButtonDisabled = false;
    $scope.submitted = false; //used so that form errors are shown only after the form has been submitted
    $scope.submit = function(contactform) {
        $scope.submitted = true;
        $scope.submitButtonDisabled = true;
        if (contactform.$valid) {
        	usSpinnerService.spin('spinner-1');
        	$scope.result='bg-success';


            $http.post(AppConfig.SERVERURL + '/api/contact/create', $scope.formData) ///api/contact/sendemail
                .then(function(result){
                    if(result){
                        $scope.submitButtonDisabled = true;
                        $scope.resultMessage = 'Contact request submitted successfully, we will contact you asap!';
                        $scope.resultMessageClass = 'successbox';                        
                        $scope.formData = null;
                    }
                    else {
                        $scope.submitButtonDisabled = false;
                        $scope.resultMessage = result.message;
                        $scope.resultMessageClass = 'errorbox';     
                    }
                    usSpinnerService.stop('spinner-1');
                });

            /*$http({
                method  : 'POST',
                url     : 'contact-form.php',
                data    : $.param($scope.formData),  //param method from jQuery
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  //set the headers so angular passing info as form data (not request payload)
            }).success(function(data){
                console.log(data);
                if (data.success) { //success comes from the return json object
                    $scope.submitButtonDisabled = true;
                    $scope.resultMessage = data.message;
                    $scope.result='bg-success';
                } else {
                    $scope.submitButtonDisabled = false;
                    $scope.resultMessage = data.message;
                    $scope.result='bg-danger';
                }
            });*/
        } else {
            $scope.submitButtonDisabled = false;
            $scope.resultMessage = 'Failed <img src="http://www.chaosm.net/blog/wp-includes/images/smilies/icon_sad.gif" alt=":(" class="wp-smiley">  Please fill out all the fields.';
            $scope.result='bg-danger';
        }
    }
}]);
