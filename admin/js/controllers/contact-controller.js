adminApp.controller('ContactCtrl', ['$scope', 'UserSrvc', 'ContactSrvc', '$location', '$route', '$window', '$uibModal', 'SERVERURL', 'usSpinnerService', '$compile', 'DTOptionsBuilder', 'DTColumnBuilder',
	function($scope, UserSrvc, ContactSrvc, $location, $route, $window, $uibModal, SERVERURL, usSpinnerService, $compile, DTOptionsBuilder, DTColumnBuilder){

	
	$scope.dtInstance = {};

	
	if (!$window.sessionStorage.token || $window.sessionStorage.token == 'null') { 
			$location.url('/admin/login')
			return;    
	 }

	 $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withOption('ajax', {
         url: '/api/contact/list',
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
        DTColumnBuilder.newColumn('name').withTitle('Name'),
        DTColumnBuilder.newColumn('email').withTitle('Email'),
        DTColumnBuilder.newColumn('subject').withTitle('Subject'),
        DTColumnBuilder.newColumn('message').withTitle('message'),
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

   
	$scope.showModal = function (contact = null) {
		usSpinnerService.spin('spinner-1');
		if(contact != null){
			ContactSrvc.detail(contact)
				.then(function(res){
					contact = res;		

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
		    		$scope.dtInstance.reloadData();
	      		});   
			});
		}
		else{

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
	    		$scope.dtInstance.reloadData();
      		});
		}

		usSpinnerService.stop('spinner-1');
	};

	$scope.deleteItem = function(id){

		if(confirm("WARNING: Are you sure you want to delete this item?") == true){
			usSpinnerService.spin('spinner-1');
			 ContactSrvc.delete(id)
				   .then(function(res){ 
				   		$scope.dtInstance.reloadData();
				   		usSpinnerService.stop('spinner-1');
				   }).catch(function(e){
				   		usSpinnerService.stop('spinner-1');
				   });
		}

		usSpinnerService.stop('spinner-1');
	}

/*	usSpinnerService.spin('spinner-1');
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
*/
 		
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