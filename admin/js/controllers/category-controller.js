adminApp.controller('CategoryCtrl', ['$scope', 'UserSrvc', 'CategorySrvc', '$location', '$route', '$window', '$uibModal', 'SERVERURL', 'usSpinnerService', function($scope, UserSrvc, CategorySrvc, $location, $route, $window, $uibModal, SERVERURL, usSpinnerService){

	$scope.imageUrl = SERVERURL+'/images/';
	$scope.cats = [];
	
	if (!$window.sessionStorage.token || $window.sessionStorage.token == 'null') { 
			$location.url('/admin/login')
			return;    
	 }

   
	$scope.showModal = function (category = null) {
		
		usSpinnerService.spin('spinner-1');

	  	var modalInstance = $uibModal.open({
	      templateUrl: 'partials/category-form.html',
	      controller: 'CategoryModalInstanceCtrl',
	      resolve: {
                category: function () {
                	usSpinnerService.stop('spinner-1');
                    return category;
                }
            }
	    });

	    modalInstance.result.then(function () {
      		CategorySrvc.getCategory()
			.then(function (cats) {
			    $scope.cats = cats;
			});
	    });

	};

	$scope.deleteItem = function(model){

		if(confirm("WARNING: Are you sure you want to delete this item?") == true){
			usSpinnerService.spin('spinner-1');
			return CategorySrvc.delete(model)
				   .then(function(res){
				   		var removeIndex = $scope.cats.indexOf(model);
				   		$scope.cats.splice(removeIndex,1);
				   		usSpinnerService.stop('spinner-1');
				   }).catch(function(e){
				   		usSpinnerService.stop('spinner-1');
				   });
		}
	}

	usSpinnerService.spin('spinner-1');
  	return UserSrvc.me()
	  .then(function (user) {
	   	return CategorySrvc.getCategory();
	  })
	  .then(function (cats) {
	    $scope.cats = cats;
	    usSpinnerService.stop('spinner-1');
	    return $scope.cats;
	  })
	  .catch(function(e){
	  	console.log(e);
	  	usSpinnerService.stop('spinner-1');
	  });

 		
}]);

adminApp.controller('CategoryModalInstanceCtrl', function ($scope, category, $http, $uibModalInstance, usSpinnerService, Notification, CategorySrvc) {

	$scope.category = category;
	$scope.catList  =  [];	

	$scope.submitForm = function(categoryForm){
		
		if(!categoryForm.$invalid){
			usSpinnerService.spin('spinner-1');
			
			if($scope.category._id){
				
				if($scope.category.type == 'blog')
					$scope.category.post_type = 'blog_category';

				return CategorySrvc.update($scope.category)
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

				if($scope.category.type == 'blog')
					$scope.category.post_type = 'blog_category';	
				
				return CategorySrvc.create($scope.category)
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

	  	CategorySrvc.getParentCategory()
		  .then(function(result){		  	
		  	$scope.catList = result;
		  	return $scope.catList;
		 });

  		$scope.cancel = function () {
  			usSpinnerService.stop('spinner-1');
    		$uibModalInstance.dismiss('cancel');
  		};

});