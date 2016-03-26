adminApp.controller('ProductCategoryCtrl', ['$scope', 'UserSrvc', 'ProductCategorySrvc', '$location', '$route', '$window', '$uibModal', 'SERVERURL', 'usSpinnerService', function($scope, UserSrvc, ProductCategorySrvc, $location, $route, $window, $uibModal, SERVERURL, usSpinnerService){

	$scope.imageUrl = SERVERURL+'/images/';
	$scope.productcats = [];
	//$scope.product  = {};
	
	if (!$window.sessionStorage.token || $window.sessionStorage.token == 'null') { 
			$location.url('/admin/login')
			return;    
	 }

   
	$scope.showModal = function (productcategory = null) {
	  	var modalInstance = $uibModal.open({
	      templateUrl: '/partials/product-category-form.html',
	      controller: 'ProductCategoryModalInstanceCtrl',
	      resolve: {
                productcategory: function () {
                    return productcategory;
                }
            }

	    });
	};

	$scope.deleteItem = function(model){

		if(confirm("WARNING: Are you sure you want to delete this item?") == true){
			usSpinnerService.spin('spinner-1');
			return ProductCategorySrvc.delete(model)
				   .then(function(res){
				   		var removeIndex = $scope.productcats.indexOf(model);
				   		$scope.productcats.splice(removeIndex,1);
				   		usSpinnerService.stop('spinner-1');
				   }).catch(function(e){
				   		usSpinnerService.stop('spinner-1');
				   });
		}
	}

	usSpinnerService.spin('spinner-1');
  	return UserSrvc.me()
	  .then(function (user) {
	   	return ProductCategorySrvc.getProductCategory();
	  })
	  .then(function (products) {
	    $scope.productcats = products;
	    usSpinnerService.stop('spinner-1');
	    return $scope.productcats;
	  })
	  .catch(function(e){
	  	console.log(e);
	  	usSpinnerService.stop('spinner-1');
	  });

 		
}]);

adminApp.controller('ProductCategoryModalInstanceCtrl', function ($scope, productcategory, $http, $uibModalInstance, ProductCategorySrvc, usSpinnerService) {

	$scope.productcategory = productcategory;
	$scope.submitForm = function(productCategoryForm){
		
		if(!productCategoryForm.$invalid){
			usSpinnerService.spin('spinner-1');
			
			if($scope.productcategory._id){
				
				return ProductCategorySrvc.update($scope.productcategory)
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

				return ProductCategorySrvc.create($scope.productcategory)
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
  		usSpinnerService.stop(category-'spinner-1');
    	$uibModalInstance.dismiss('cancel');
  	};

});