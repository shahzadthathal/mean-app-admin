
adminApp.factory("UserSrvc", function($http,$window){
	return {
			create:function(user){
				return $http.post('/api/users/create', user)
						.then(function(result){
							return result.data;
						});
			},
			login:function(user){
				return $http.post('/api/users/login', user)
						.then(function(result){
							return result.data;			   
						});
			},
			me: function () {
		      return $http.get('/api/users/me')
		      .then(function (result) {
		        return result.data;
		      });
		    },
		    update: function (user) {
		      return $http.put('/api/users/update/' + user._id, user)
		      .then(function (result) {
		        return result.data;
		      });
    		}
	}
});