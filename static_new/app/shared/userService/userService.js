secApp.factory('userService', function($http,$window) {
		
    var userAPI = {};
    userAPI.getUserInfo = function(url) {
      return $http({method: 'GET', url: url});
    }
    
    userAPI.logout = function() {
	      $http.post('logout', {});
	    };
	    
    return userAPI;
  });
