
secApp.run(function($rootScope, $state, $stateParams, $location, $state, loginService) {
	$rootScope.$on('$stateChangeStart', 
      function(event, toState, toParams, fromState, fromParams){ 
          console.log('Changed state to: ' + toState);
      });
    
      if(!loginService.isAuthenticated()) {
        //$location.path('/login');
        $location.path('/dashboard');
      }
 });


secApp.config(['$stateProvider', '$urlRouterProvider',function ($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/dashboard');
	$stateProvider.state("dashboard", {
        url: "/dashboard",
        templateUrl: "./app/components/dashboard/dashboardView.html",
        controller: "dashboardController"
      }).state("meridium", {
        url: "/meridium",
        templateUrl: "./app/components/meridium/meridiumView.html",
        controller: "meridiumController"
      }).state("eterra", {
    	  url: "/eterra",
    	  templateUrl: "./app/components/eterra/eterraView.html",
    	  controller: "eterraController"
      }).state("oe", {
    	  url: "/oe",
    	  templateUrl: "./app/components/oe/oeView.html",
    	  controller: "oeController"
      }).state("powermap", {
    	  url: "/powermap",
    	  templateUrl: "./app/components/powermap/powermapView.html",
    	  controller: "powermapController"
      }).state("amchart", {
    	  url: "/amchart",
    	  templateUrl: "./app/components/amchart/amchartView.html",
    	  controller: "amchartController"
      }).state("login", {
    	  url: "/login",
    	  templateUrl: "./app/components/login/loginView.html",
    	  controller: "loginController"
      });
}]);







  

  