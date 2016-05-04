
adminApp.controller('CrudCtrl', ['$scope', 'DTOptionsBuilder', 'DTColumnBuilder', function($scope, DTOptionsBuilder, DTColumnBuilder){



    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withOption('ajax', {
         // Either you specify the AjaxDataProp here
        // dataSrc: 'data',
         url: '/api/product/list',
         type: 'GET'
     })
     // or here
        .withDataProp('data')
        .withOption('processing', true)
        .withOption('serverSide', true)
        .withPaginationType('full_numbers');

    $scope.dtColumns = [
        DTColumnBuilder.newColumn('_id').withTitle('ID'),
        DTColumnBuilder.newColumn('title').withTitle('Title'),
        DTColumnBuilder.newColumn('description').withTitle('Description').notVisible()
    ];

}]);