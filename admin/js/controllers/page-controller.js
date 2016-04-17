adminApp.controller('PageCtrl', ['$scope', 'UserSrvc', 'PageSrvc', '$location', '$route', '$window', '$uibModal', 'SERVERURL', 'usSpinnerService', function($scope, UserSrvc, PageSrvc, $location, $route, $window, $uibModal, SERVERURL, usSpinnerService){

	$scope.pages = [];
	
	if (!$window.sessionStorage.token || $window.sessionStorage.token == 'null') { 
			$location.url('/admin/login')
			return;    
	 }

   
	$scope.showModal = function (page = null) {
	  	var modalInstance = $uibModal.open({
	      templateUrl: 'partials/page-form.html',
	      controller: 'PageModalInstanceCtrl',
	      resolve: {
                page: function () {
                    return page;
                }
            }
	    });

	    modalInstance.result.then(function () {
      		PageSrvc.getPages()
			.then(function (pages) {
			    $scope.pages = pages;
			});
	    });
	};

	$scope.deleteItem = function(model){

		if(confirm("WARNING: Are you sure you want to delete this item?") == true){
			usSpinnerService.spin('spinner-1');
			return PageSrvc.delete(model)
				   .then(function(res){
				   		var removeIndex = $scope.pages.indexOf(model);
				   		$scope.pages.splice(removeIndex,1);
				   		usSpinnerService.stop('spinner-1');
				   }).catch(function(e){
				   		usSpinnerService.stop('spinner-1');
				   });
		}
	}

	usSpinnerService.spin('spinner-1');
  	return UserSrvc.me()
	  .then(function (user) {
	   	return PageSrvc.getPages();
	  })
	  .then(function (pages) {
	    $scope.pages = pages;
	    usSpinnerService.stop('spinner-1');
	    return $scope.pages;
	  })
	  .catch(function(e){
	  	console.log(e);
	  	usSpinnerService.stop('spinner-1');
	  });

 		
}]);

adminApp.controller('PageModalInstanceCtrl', function ($scope, page, $http, $uibModalInstance, PageSrvc, usSpinnerService, Notification) {

	$scope.page = page;
	//$scope.htmlVariable;
	$scope.submitForm = function(pageForm){
		
		if(!pageForm.$invalid){
			usSpinnerService.spin('spinner-1');
			
			if( $scope.page !=null && $scope.page._id){
				
				return PageSrvc.update($scope.page)
					   .then(function(result){
					   		usSpinnerService.stop('spinner-1');
					   		if(result == 'Slug exist')
					   			Notification.error({message: 'Slug already taken, please choose another!', delay: 3000});
					   		else{
					   			Notification.success({message: 'Item updated successfully!', delay: 2000});
				   				$uibModalInstance.close();
				   			}
					   })
					   .catch(function(e){
					   	    usSpinnerService.stop('spinner-1');
					   	    $uibModalInstance.close();
					   		console.log(e);
					   });
			}
			else{

				return PageSrvc.create($scope.page)
				   .then(function(result){
				   	usSpinnerService.stop('spinner-1');
				   		if(result == 'Slug exist')
				   			Notification.error({message: 'Slug already taken, please choose another!', delay: 3000});
				   		else{
				   			Notification.success({message: 'Item created successfully!', delay: 2000});
			   				$uibModalInstance.close();
			   			} 
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