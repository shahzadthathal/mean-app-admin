adminApp.controller('ProductCtrl', ['$scope', 'UserSrvc', 'ProductSrvc', '$location', '$route', '$window', '$uibModal', 'SERVERURL', 'usSpinnerService', function($scope, UserSrvc, ProductSrvc,  $location, $route, $window, $uibModal, SERVERURL, usSpinnerService){

	$scope.imageUrl = SERVERURL+'/images/';
	$scope.products = [];
	
	if (!$window.sessionStorage.token || $window.sessionStorage.token == 'null') { 
			$location.url('/admin/login')
			return;    
	 }

   
	$scope.showModal = function (product = null) {
		usSpinnerService.spin('spinner-1');
	  	var modalInstance = $uibModal.open({
	      templateUrl: 'partials/product-form.html',
	      controller: 'ProductModalInstanceCtrl',
	      resolve: {
                product: function () {
                	usSpinnerService.stop('spinner-1');
                    return product;
                }
            }

	    });

	    modalInstance.result.then(function () {
      		ProductSrvc.getProducts()
			.then(function (products) {
			    $scope.products = products;
			});
	    });


	};

	$scope.deleteItem = function(model){

		if(confirm("WARNING: Are you sure you want to delete this item?") == true){
			usSpinnerService.spin('spinner-1');
			return ProductSrvc.delete(model)
				   .then(function(res){
				   		var removeIndex = $scope.products.indexOf(model);
				   		$scope.products.splice(removeIndex,1);
				   		usSpinnerService.stop('spinner-1');
				   }).catch(function(e){
				   		usSpinnerService.stop('spinner-1');
				   });
		}
	}

	usSpinnerService.spin('spinner-1');
  	return UserSrvc.me()
	  .then(function (user) {
	   	return ProductSrvc.getProducts();
	  })
	  .then(function (products) {
	    $scope.products = products;
	    usSpinnerService.stop('spinner-1');
	    return $scope.products;
	    //return ProductCategorySrvc.getProductCategory();
	  })
	  .catch(function(e){
	  	console.log(e);
	  	usSpinnerService.stop('spinner-1');
	  });

 		
}]);

adminApp.controller('ProductModalInstanceCtrl', function ($scope, product, $http, $uibModalInstance, ProductSrvc, usSpinnerService, CategorySrvc, TagSrvc, Notification) {

    var uploadedImageName = 'noimage.png';
	$scope.product = product;	
	$scope.catsList =  $scope.subCatList = $scope.tagList = [];
	 
	if($scope.product == null){
		//console.log('product is null',$scope.product);
	}
	else{
		if($scope.product.image =='')
			$scope.product.image = uploadedImageName;
		else	
			uploadedImageName = $scope.product.image;
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
		     			//console.log("uploaded image name",uploadedImageName);
		      	});
	};

	$scope.submitForm = function(productForm){
		
		if(!productForm.$invalid){
			usSpinnerService.spin('spinner-1');
			$scope.product.image = uploadedImageName;

			//console.log('submitted image name',uploadedImageName);

			if($scope.product._id){
				
				return ProductSrvc.update($scope.product)
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
					   	    //$uibModalInstance.close();
					   		console.log(e);
					   });
			}
			else{

				$scope.product.image = uploadedImageName;			
				return ProductSrvc.create($scope.product)
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

  	    CategorySrvc.getParentProductCategory('product')
		  .then(function(result){
		  	$scope.catsList = result;
		  	return TagSrvc.getTags();
		  })
		  .then(function(tags){
		  	$scope.tagList = tags;
		  	return $scope.tagList;
		  });

		  $scope.$watch('product.category', function(newValue, oldValue, scope) {
              if(newValue != oldValue){
              	CategorySrvc.getSubCategory($scope.product.category)
              	.then(function(result){
              		  $scope.subCatList =  result;
              	});
              }
        });

		if($scope.product){
			CategorySrvc.getSubCategory($scope.product.category)
              	.then(function(result){
              		  $scope.subCatList =  result;
              	});
		}


});