secApp.controller("powermapController", function ($scope, $rootScope, $window, $q,  dataService, loginService) {
	$scope.title = "Power Plant Map";
	$scope.sites = [];
	$scope.tempSite;
	$scope.isSiteLoaded = false;
	$scope.isSelectedSiteToggle = false;
    dataService.getRecords($window.location.origin.concat('/sites')).then((sites)=>{
    	sites._embedded.sites.forEach((site, stIdx)=>{
    		$scope.tempSite = site;
    		$scope.stIdx = stIdx;
    		dataService.getRecords(site._links.plants.href).then((plants)=>{
    			$scope.sites.push({site: $scope.tempSite, plants: plants._embedded.plants});
    			plants._embedded.plants.forEach((plant, pltIdx)=>{
    				$scope.pltIdx = pltIdx;
    				dataService.getRecords(plant._links.notifications.href).then((notifi)=>{
    					$scope.sites[$scope.stIdx].plants[$scope.pltIdx].notifications = notifi._embedded.notifications;
    				});
    				
    			});
    			
    		});
    		
    	});	
    });
    
    $scope.isSiteLoaded = true; 
    $scope.setSelectedSite = function(site){
    	$scope.selectedSite = site;
    	$scope.isSelectedSiteToggle = !$scope.isSelectedSiteToggle;
    }
    
});



