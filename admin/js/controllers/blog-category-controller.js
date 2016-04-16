adminApp.controller('BlogCategoryCtrl', ['$scope', 'UserSrvc', 'BlogCategorySrvc', '$location', '$route', '$window', '$uibModal', 'SERVERURL', 'usSpinnerService', function($scope, UserSrvc, BlogCategorySrvc, $location, $route, $window, $uibModal, SERVERURL, usSpinnerService){

	$scope.blogcats = [];
	
	if (!$window.sessionStorage.token || $window.sessionStorage.token == 'null') { 
			$location.url('/admin/login')
			return;    
	 }

   
	$scope.showModal = function (blogcategory = null) {
	  	var modalInstance = $uibModal.open({
	      templateUrl: 'partials/blog-category-form.html',
	      controller: 'BlogCategoryModalInstanceCtrl',
	      resolve: {
                blogcategory: function () {
                    return blogcategory;
                }
            }

	    });
	};

	$scope.deleteItem = function(model){

		if(confirm("WARNING: Are you sure you want to delete this item?") == true){
			usSpinnerService.spin('spinner-1');
			return BlogCategorySrvc.delete(model)
				   .then(function(res){
				   		var removeIndex = $scope.blogcats.indexOf(model);
				   		$scope.blogcats.splice(removeIndex,1);
				   		usSpinnerService.stop('spinner-1');
				   }).catch(function(e){
				   		usSpinnerService.stop('spinner-1');
				   });
		}
	}

	usSpinnerService.spin('spinner-1');
  	return UserSrvc.me()
	  .then(function (user) {
	   	return BlogCategorySrvc.getBlogCategory();
	  })
	  .then(function (blogcats) {
	    $scope.blogcats = blogcats;
	    usSpinnerService.stop('spinner-1');
	    return $scope.blogcats;
	  })
	  .catch(function(e){
	  	console.log(e);
	  	usSpinnerService.stop('spinner-1');
	  });

 		
}]);

adminApp.controller('BlogCategoryModalInstanceCtrl', function ($scope, blogcategory, $http, $uibModalInstance, BlogCategorySrvc, usSpinnerService, Notification) {

	$scope.blogcategory = blogcategory;
	$scope.submitForm = function(blogCategoryForm){
		
		if(!blogCategoryForm.$invalid){
			usSpinnerService.spin('spinner-1');
			
			if( $scope.blogcategory !=null && $scope.blogcategory._id){
				
				return BlogCategorySrvc.update($scope.blogcategory)
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

				return BlogCategorySrvc.create($scope.blogcategory)
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