
adminApp.controller('ProductCtrl', ['$scope', 'UserSrvc', 'ProductSrvc', '$location', '$route', '$window', '$uibModal', 'SERVERURL', 'usSpinnerService', '$compile', 'DTOptionsBuilder', 'DTColumnBuilder',  
	function($scope, UserSrvc, ProductSrvc,  $location, $route, $window, $uibModal, SERVERURL, usSpinnerService, $compile, DTOptionsBuilder, DTColumnBuilder){

	$scope.imageUrl = SERVERURL+'/images/';
	$scope.products = [];
	$scope.dtInstance = {};

	if (!$window.sessionStorage.token || $window.sessionStorage.token == 'null') { 
			$location.url('/admin/login')
			return;    
	 }

   
   $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withOption('ajax', {
         // Either you specify the AjaxDataProp here
        // dataSrc: 'data',
         url: '/api/product/list',
         type: 'GET',
     	})
     	// or here
        .withDataProp('data')
		.withOption('aLengthMenu', [5, 10, 20, 50, 100,500])
        .withOption('processing', true)
        .withOption('serverSide', true)
        .withPaginationType('full_numbers')
        .withDisplayLength(10)
        .withOption('initComplete', function() {
		     $('.dataTables_filter input').unbind();
		     $('<button/>').text('search').attr('id', 'new-search').appendTo('.dataTables_filter');
		     $('#new-search').on('click', function() { 
		       $scope.dtInstance.DataTable.search($('.dataTables_filter input').val()).draw();
		     })  
		 })
        .withOption('createdRow', function(row, data, dataIndex) {

            $compile(angular.element(row).contents())($scope);
        });
        
    $scope.dtColumns = [
        DTColumnBuilder.newColumn('_id').withTitle('ID').notVisible(),
        DTColumnBuilder.newColumn('title').withTitle('Title'),
        DTColumnBuilder.newColumn('sale_price').withTitle('Sale Price'),
        DTColumnBuilder.newColumn('general_price').withTitle('General Price'),
        DTColumnBuilder.newColumn(null).withTitle('Image').renderWith(function(data, type, full, meta) {
        	return '<img ng-src="'+ $scope.imageUrl+ data.image+'" height="70" width="80" alt=""/>';
        }),
		DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable()
            .renderWith(function(data, type, full, meta) {
                return '<button class="btn btn-warning" ng-click="showModal(\'' +  data._id  + '\')">' +
                    '   <i class="fa fa-edit"></i>' +
                    '</button>&nbsp;' +
                    '<button class="btn btn-danger" ng-click="deleteItem(\'' + data._id + '\')">' +
                    '   <i class="fa fa-trash-o"></i>' +
                    '</button>';
            })
    ];

   

	$scope.showModal = function (product = null) {
	
		usSpinnerService.spin('spinner-1');
		
		if(product != null){

				ProductSrvc.detail(product)
				.then(function(res){
					product = res;
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
		      			$scope.dtInstance.reloadData();
			    	});

	    		});
		}
		else{

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
      			$scope.dtInstance.reloadData();
	    	});
		}		

	};

	$scope.deleteItem = function(id){

		if(confirm("WARNING: Are you sure you want to delete this item?") == true){
			usSpinnerService.spin('spinner-1');
			return ProductSrvc.delete(id)
				   .then(function(res){
				   		usSpinnerService.stop('spinner-1');
				   		$scope.dtInstance.reloadData();
				   }).catch(function(e){
				   		usSpinnerService.stop('spinner-1');
				   });
		}
	}

	
	

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