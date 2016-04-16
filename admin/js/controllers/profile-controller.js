adminApp.controller('ProfileCtrl', ['$scope', 'UserSrvc', '$location', '$route', '$window', '$uibModal', 'SERVERURL', 'usSpinnerService', function($scope, UserSrvc,  $location, $route, $window, $uibModal, SERVERURL, usSpinnerService){

	$scope.imageUrl = SERVERURL+'/images/';
	$scope.profileDetail = {};
	
	if (!$window.sessionStorage.token || $window.sessionStorage.token == 'null') { 
			$location.url('/admin/login')
			return;    
	 }

   
	$scope.showModal = function (profile = $scope.profileDetail) {
		
		usSpinnerService.spin('spinner-1');

	  	var modalInstance = $uibModal.open({
	      templateUrl: 'partials/profile-form.html',
	      controller: 'ProfileModalInstanceCtrl',
	      resolve: {
                profile: function () {
                    return profile;
                }
            }

	    });
	    usSpinnerService.stop('spinner-1');
	};

	usSpinnerService.spin('spinner-1');
  	return UserSrvc.me()
	  .then(function (user) {
	   	$scope.profileDetail = user;
	   	usSpinnerService.stop('spinner-1');
	   	return $scope.profileDetail;
	  })
	  .catch(function(e){
	  	console.log(e);
	  	usSpinnerService.stop('spinner-1');
	  });

 		
}]);

adminApp.controller('ProfileModalInstanceCtrl', function ($scope, profile, $http, $uibModalInstance, UserSrvc, usSpinnerService, Notification) {

    var uploadedImageName = 'noimage.png';
	$scope.profile = profile;	
	 
	if($scope.profile == null){
		//console.log('profile is null',$scope.profile);
	}
	else{
		if($scope.profile.image =='')
			$scope.profile.image = uploadedImageName;
		else	
			uploadedImageName = $scope.profile.image;
	}

    $scope.uploadFile = function(files) {
		    var fd = new FormData();
		    fd.append("file", files[0]);

		    return $http.post('/api/product/uploadimage', fd, {
			    	withCredentials: true,
			        headers: {'Content-Type': undefined },
			        transformRequest: angular.identity
		    	})
		     	.then(function (result) {
		     			uploadedImageName = result.data.imageName;
		     			console.log("uploaded image name",uploadedImageName);
		      	});
	};

	$scope.submitForm = function(profileForm){
		
		if(!profileForm.$invalid){
			usSpinnerService.spin('spinner-1');
			$scope.profile.image = uploadedImageName;

			//console.log('submitted image name',uploadedImageName);

			if($scope.profile._id){
				
				return UserSrvc.update($scope.profile)
					   .then(function(result){
					   		usSpinnerService.stop('spinner-1');
					   		Notification.success({message: 'Profile updated successfully!', delay: 2000});
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