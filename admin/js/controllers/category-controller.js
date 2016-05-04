adminApp.controller('CategoryCtrl', ['$scope', 'UserSrvc', 'CategorySrvc', '$location', '$route', '$window', '$uibModal', 'SERVERURL', 'usSpinnerService', '$compile', 'DTOptionsBuilder', 'DTColumnBuilder',
	function($scope, UserSrvc, CategorySrvc, $location, $route, $window, $uibModal, SERVERURL, usSpinnerService, $compile, DTOptionsBuilder, DTColumnBuilder){

	$scope.imageUrl = SERVERURL+'/images/';
	$scope.dtInstance = {};
	if (!$window.sessionStorage.token || $window.sessionStorage.token == 'null') { 
			$location.url('/admin/login')
			return;    
	 }

	 $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withOption('ajax', {
         url: '/api/category/list',
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
        DTColumnBuilder.newColumn('slug').withTitle('Slug'),
        DTColumnBuilder.newColumn('type').withTitle('Type'),
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

   
	$scope.showModal = function (category = null) {
		
		usSpinnerService.spin('spinner-1');

		if(category != null)
		{
			CategorySrvc.detail(category)
			.then(function(res){
				category = res;
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
		      		$scope.dtInstance.reloadData();
			    });
		    });
		 }
		 else{
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
	      		$scope.dtInstance.reloadData();
		    });	
		 }

	};

	$scope.deleteItem = function(id){

		if(confirm("WARNING: Are you sure you want to delete this item?") == true){
			usSpinnerService.spin('spinner-1');
			return CategorySrvc.delete(id)
				   .then(function(res){
				   		usSpinnerService.stop('spinner-1');
				   		$scope.dtInstance.reloadData();
				   }).catch(function(e){
				   		usSpinnerService.stop('spinner-1');
				   });
		}
	}

	/*usSpinnerService.spin('spinner-1');
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
	*/
 		
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