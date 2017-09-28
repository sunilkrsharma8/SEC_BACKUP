secApp.controller('loginController', function($scope, $rootScope, $stateParams, $state, loginService) {
    $rootScope.title = "Login Sample";
    
    $scope.formSubmit = function() {
      if(loginService.login($scope.username, $scope.password)) {
        $scope.error = '';
        $scope.username = '';
        $scope.password = '';
        $state.transitionTo('dashboard');
      } else {
        $scope.error = "Incorrect username/password !";
      }   
    }; 
  });
  