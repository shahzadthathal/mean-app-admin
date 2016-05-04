adminApp.controller('BlogCtrl', ['$scope', 'UserSrvc', 'BlogSrvc', '$location', '$route', '$window', '$uibModal', 'SERVERURL', 'usSpinnerService', '$compile', 'DTOptionsBuilder', 'DTColumnBuilder',
 function($scope, UserSrvc, BlogSrvc, $location, $route, $window, $uibModal, SERVERURL, usSpinnerService, $compile, DTOptionsBuilder, DTColumnBuilder){

	$scope.imageUrl = SERVERURL+'/images/';
	$scope.dtInstance = {};

	if (!$window.sessionStorage.token || $window.sessionStorage.token == 'null') { 
			$location.url('/admin/login')
			return;    
	 }

    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withOption('ajax', {
         url: '/api/blog/list',
         type: 'GET',
     	})
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
        DTColumnBuilder.newColumn('author').withTitle('Auther'),
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

	$scope.showModal = function (blog = null) {
		usSpinnerService.spin('spinner-1');
		if(blog != null){
				BlogSrvc.detail(blog)
				.then(function(res){
					blog = res;					
					  	var modalInstance = $uibModal.open({
					      templateUrl: 'partials/blog-form.html',
					      controller: 'BlogModalInstanceCtrl',
					      resolve: {
				                blog: function () {
				                	usSpinnerService.stop('spinner-1');
				                    return blog;
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
					      templateUrl: 'partials/blog-form.html',
					      controller: 'BlogModalInstanceCtrl',
					      resolve: {
				                blog: function () {
				                	usSpinnerService.stop('spinner-1');
				                    return blog;
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
			return BlogSrvc.delete(id)
				   .then(function(res){				   		
				   		usSpinnerService.stop('spinner-1');
				   		$scope.dtInstance.reloadData();
				   }).catch(function(e){
				   		usSpinnerService.stop('spinner-1');
				   });
		}
	}

	/*
	usSpinnerService.spin('spinner-1');
  	return UserSrvc.me()
	  .then(function (user) {
	   	return BlogSrvc.getBlogs();
	  })
	  .then(function (blogs) {
	    $scope.blogs = blogs;
	    usSpinnerService.stop('spinner-1');
	    return $scope.blogs;
	  })
	  .catch(function(e){
	  	console.log(e);
	  	usSpinnerService.stop('spinner-1');
	  });
	*/

 		
}]);

adminApp.controller('BlogModalInstanceCtrl', function ($scope, blog, $http, $uibModalInstance, BlogSrvc, usSpinnerService, CategorySrvc, TagSrvc, Notification) {

    var uploadedImageName = 'noimage.png';
	$scope.blog = blog;
	$scope.catsList =  $scope.subCatList = $scope.tagList = [];

	if($scope.blog == null){
		console.log('blog is null',$scope.blog);
	}
	else{
		if($scope.blog.image =='')
			$scope.blog.image = uploadedImageName;
		else	
			uploadedImageName = $scope.blog.image;
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

	$scope.submitForm = function(blogForm){
		
		if(!blogForm.$invalid){
			usSpinnerService.spin('spinner-1');
			$scope.blog.image = uploadedImageName;

			console.log('submitted image name',uploadedImageName);

			if($scope.blog._id){

				return BlogSrvc.update($scope.blog)
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

				$scope.blog.image = uploadedImageName;			
				return BlogSrvc.create($scope.blog)
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

  	    CategorySrvc.getParentBlogCategory('blog')
		  .then(function(result){
		  	$scope.catsList = result;
		  	return TagSrvc.getTags();
		  })
		  .then(function(tags){
		  	$scope.tagList = tags;
		  	return $scope.tagList;
		  });

		  $scope.$watch('blog.category', function(newValue, oldValue, scope) {
              if(newValue != oldValue){
              	CategorySrvc.getSubCategory($scope.blog.category)
              	.then(function(result){
              		  $scope.subCatList =  result;
              	});
              }
        });

		if($scope.blog){
			CategorySrvc.getSubCategory($scope.blog.category)
              	.then(function(result){
              		  $scope.subCatList =  result;
              	});
		}


});