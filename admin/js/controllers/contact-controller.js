adminApp.controller('ContactCtrl', ['$scope', 'UserSrvc', 'ContactSrvc', '$location', '$route', '$window', '$uibModal', 'SERVERURL', 'usSpinnerService', function($scope, UserSrvc, ContactSrvc, $location, $route, $window, $uibModal, SERVERURL, usSpinnerService){

	$scope.contacts = [];
	
	if (!$window.sessionStorage.token || $window.sessionStorage.token == 'null') { 
			$location.url('/admin/login')
			return;    
	 }

   
	$scope.showModal = function (contact = null) {
	  	var modalInstance = $uibModal.open({
	      templateUrl: 'partials/contact-form.html',
	      controller: 'ContactModalInstanceCtrl',
	      resolve: {
                contact: function () {
                    return contact;
                }
            }
	    });

	    modalInstance.result.then(function () {
      		ContactSrvc.getContacts() 
			.then(function (contacts) {
			    $scope.contacts = contacts;
			})   
		});
	};

	$scope.deleteItem = function(model){

		if(confirm("WARNING: Are you sure you want to delete this item?") == true){
			usSpinnerService.spin('spinner-1');
			 ContactSrvc.delete(model)
				   .then(function(res){ 
				   		var removeIndex = $scope.contacts.indexOf(model);
				   		$scope.contacts.splice(removeIndex,1);
				   		usSpinnerService.stop('spinner-1');
				   }).catch(function(e){
				   		usSpinnerService.stop('spinner-1');
				   });
		}
	}

	usSpinnerService.spin('spinner-1');
  	return UserSrvc.me()
	  .then(function (user) {
	   	return ContactSrvc.getContacts();
	   })
	  .then(function(contacts){
	    $scope.contacts = contacts;
	    usSpinnerService.stop('spinner-1');
	    return $scope.contacts;
	  })
	  .catch(function(e){
	  	console.logcontact;
	  	usSpinnerService.stop('spinner-1');
	  });

 		
}]);

adminApp.controller('ContactModalInstanceCtrl', function ($scope, contact, $http, $uibModalInstance, ContactSrvc, usSpinnerService, Notification) {

	$scope.contact = contact;
	$scope.submitForm = function(contactForm){
		
		if(!contactForm.$invalid){
			usSpinnerService.spin('spinner-1');
			
			if( $scope.contact !=null && $scope.contact._id){
				
				return ContactSrvc.update($scope.contact)
					   .then(function(result){

					   		usSpinnerService.stop('spinner-1');
					   		if(result == 'Slug exist')
					   			Notification.error({message: 'Title already taken, please choose another!', delay: 3000});
					   		else{
					   			Notification.success({message: 'Item updated successfully!', delay: 2000});
				   				$uibModalInstance.close();
				   			}
					   })
					  contactatch(function(e){
					   	    usSpinnerService.stop('spinner-1');
					   	    $uibModalInstance.close();
					   		console.log(e);
					   });
			}
			else{

				return ContactSrvc.create($scope.contact)
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