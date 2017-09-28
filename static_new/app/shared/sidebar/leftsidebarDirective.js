secApp.directive('leftsidebarDirective', ['userService', function(userService) {
    return {
        restrict: 'EA',
        replace: true,
        templateUrl: 'app/shared/sidebar/leftsidebarDirective.html',
        link: function($scope, $element, $attrs) {
        	$scope.userInfo = null;
        	
        	$scope.logout = function() {
        		userService.logout();
        	};
        	 
         	userService.getUserInfo(window.location.origin.concat('/user')).then((data)=> {
        		$scope.userInfo = data;				
        	});
         	
        }
    };
}]);