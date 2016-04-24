adminApp.controller('SettingCtrl', ['$scope', 'UserSrvc', 'SettingSrvc', '$location', '$route', '$window', '$uibModal', 'SERVERURL', 'usSpinnerService', function($scope, UserSrvc, SettingSrvc, $location, $route, $window, $uibModal, SERVERURL, usSpinnerService){

	$scope.settings = [];
	
	if (!$window.sessionStorage.token || $window.sessionStorage.token == 'null') { 
			$location.url('/admin/login')
			return;    
	 }

   
	$scope.showModal = function (setting = null) {
		console.log(setting);
	  	var modalInstance = $uibModal.open({
	      templateUrl: 'partials/setting-form.html',
	      controller: 'SettingModalInstanceCtrl',
	      resolve: {
                setting: function () {
                    return setting;
                }
            }
	    });

	    modalInstance.result.then(function () {
      		SettingSrvc.getSettings()
			.then(function (settings) {
			    $scope.settings = settings;
			});
	    });
	};

	$scope.deleteItem = function(model){

		if(confirm("WARNING: Are you sure you want to delete this item?") == true){
			usSpinnerService.spin('spinner-1');
			return SettingSrvc.delete(model)
				   .then(function(res){
				   		var removeIndex = $scope.settings.indexOf(model);
				   		$scope.settings.splice(removeIndex,1);
				   		usSpinnerService.stop('spinner-1');
				   }).catch(function(e){
				   		usSpinnerService.stop('spinner-1');
				   });
		}
	}

	usSpinnerService.spin('spinner-1');
  	return UserSrvc.me()
	  .then(function (user) {
	   	return SettingSrvc.getSettings();
	  })
	  .then(function (settings) {
	    $scope.settings = settings;
	    usSpinnerService.stop('spinner-1');
	    return $scope.settings;
	  })
	  .catch(function(e){
	  	console.log(e);
	  	usSpinnerService.stop('spinner-1');
	  });

 		
}]);

adminApp.controller('SettingModalInstanceCtrl', function ($scope, setting, $http, $uibModalInstance, SettingSrvc, usSpinnerService, Notification) {

	$scope.setting = setting;
	$scope.submitForm = function(settingForm){
		
		if(!settingForm.$invalid){
			usSpinnerService.spin('spinner-1');
			
			if( $scope.setting !=null && $scope.setting._id){
				
				return SettingSrvc.update($scope.setting)
					   .then(function(result){

					   		usSpinnerService.stop('spinner-1');
					   		Notification.success({message: 'Item updated successfully!', delay: 2000});
				   			$uibModalInstance.close();
				   			
					   })
					   .catch(function(e){
					   	    usSpinnerService.stop('spinner-1');
					   	    $uibModalInstance.close();
					   		console.log(e);
					   });
			}
			else{

				return SettingSrvc.create($scope.setting)
				   .then(function(result){
				   	usSpinnerService.stop('spinner-1');
				   	Notification.success({message: 'Item created successfully!', delay: 2000});
			   		$uibModalInstance.close();
			   				   
				   })
				   .catch(function(e){
					   	    usSpinnerService.stop('spinner-1');
					   	    $uibModalInstance.close();
					   		console.log(e);
					   });
			}
		}
	}

  	$scope.cancel = function () {
  		usSpinnerService.stop('spinner-1');
    	$uibModalInstance.dismiss('cancel');
  	};

});