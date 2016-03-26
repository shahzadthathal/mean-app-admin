adminApp.controller('TagCtrl', ['$scope', 'UserSrvc', 'TagSrvc', '$location', '$route', '$window', '$uibModal', 'SERVERURL', 'usSpinnerService', function($scope, UserSrvc, TagSrvc, $location, $route, $window, $uibModal, SERVERURL, usSpinnerService){

	$scope.tags = [];
	
	if (!$window.sessionStorage.token || $window.sessionStorage.token == 'null') { 
			$location.url('/admin/login')
			return;    
	 }

   
	$scope.showModal = function (tag = null) {
	  	var modalInstance = $uibModal.open({
	      templateUrl: '/partials/tag-form.html',
	      controller: 'TagModalInstanceCtrl',
	      resolve: {
                tag: function () {
                    return tag;
                }
            }

	    });
	};

	$scope.deleteItem = function(model){

		if(confirm("WARNING: Are you sure you want to delete this item?") == true){
			usSpinnerService.spin('spinner-1');
			return TagSrvc.delete(model)
				   .then(function(res){
				   		var removeIndex = $scope.tags.indexOf(model);
				   		$scope.tags.splice(removeIndex,1);
				   		usSpinnerService.stop('spinner-1');
				   }).catch(function(e){
				   		usSpinnerService.stop('spinner-1');
				   });
		}
	}

	usSpinnerService.spin('spinner-1');
  	return UserSrvc.me()
	  .then(function (user) {
	   	return TagSrvc.getTags();
	  })
	  .then(function (tags) {
	    $scope.tags = tags;
	    usSpinnerService.stop('spinner-1');
	    return $scope.tags;
	  })
	  .catch(function(e){
	  	console.log(e);
	  	usSpinnerService.stop('spinner-1');
	  });

 		
}]);

adminApp.controller('TagModalInstanceCtrl', function ($scope, tag, $http, $uibModalInstance, TagSrvc, usSpinnerService) {

	$scope.tag = tag;
	$scope.submitForm = function(tagForm){
		
		if(!tagForm.$invalid){
			usSpinnerService.spin('spinner-1');
			
			if( $scope.tag !=null && $scope.tag._id){
				
				return TagSrvc.update($scope.tag)
					   .then(function(result){
					   		usSpinnerService.stop('spinner-1');
				   			$uibModalInstance.close();
					   })
					   .catch(function(e){
					   	    usSpinnerService.stop('spinner-1');
					   	    $uibModalInstance.close();
					   		console.log(e);
					   });
			}
			else{

				return TagSrvc.create($scope.tag)
				   .then(function(result){
				   		usSpinnerService.stop('spinner-1');
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