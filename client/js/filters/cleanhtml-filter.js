clientApp.filter("cleanHTML", ['$sce', function($sce){
	return function(html_code){
		return $sce.trustAsHtml(html_code);
	}
}]);