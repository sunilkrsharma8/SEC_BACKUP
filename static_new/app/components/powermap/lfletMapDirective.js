secApp.directive('lfletMapDirective', ['dataService', function(dataService) {
    return {
        restrict: 'EA',
        replace: true,
        scope: false,
        templateUrl: 'app/components/powermap/lfletMapDirective.html',
        link: function($scope, $element, $attrs) {
        	 $scope.setSitePopup = function (site) {
        	     var id = 'popup' + site.name;
        	     var table = document.createElement('table');
        	     table.setAttribute("id", id);
        	     table.setAttribute("class", "table table-text-size");
        	     var thead = document.createElement('thead');
        	     var tr = document.createElement('tr');
        	     thead.appendChild(tr);
        	     var th1 = document.createElement('th');
        	     var th1text = document.createTextNode('Plant');
        	     th1.appendChild(th1text);
        	     tr.appendChild(th1);
        	     var th2 = document.createElement('th');
        	     var th2text = document.createTextNode('Notifications');
        	     th2.appendChild(th2text);
        	     tr.appendChild(th2);
        	     table.appendChild(thead);
        	     tbody = document.createElement('tbody');
        	    
        	     for(let i=0; i<site.plants.length; i++){
        	    	 var newRow = tbody.insertRow(0);        	    	        	    	 
        	    	 var newCell1 = newRow.insertCell(0);
        	         var newText1 = document.createElement("span");
        	         newText1.setAttribute("class", "textLimit");
        	         newText1.innerHTML = site.plants[i].name;
        	         newCell1.appendChild(newText1);
        	         var newCell2 = newRow.insertCell(1);
        	         var newText2 = document.createElement("span");
        	         newText2.plant = site.plants[i];
        	         newText2.notifications = site.plants[i].notifications;
        	        
        	         if (site.plants[i].notifications.length) {
        	             newText1.onclick = function(){
        	            	 var plantInfo = "Alert Notifications of " + site.plants[i].name.toUpperCase(); 
        	                 $("#markerNotificationPlantInfo").html(plantInfo);
        	                 var table = $("<table />");
        	                 table.addClass("table table-responsive table-striped");
        	                 var columnCountArr = [1, 2, 3, 4, 5];
        	                 var notificationsArr = site.plants[i].notifications;

        	                 var row = $(table[0].insertRow(-1));

        	                 columnCountArr.forEach(function(value, i) {
        	                     var headerCell = $("<th />");
        	                     headerCell.html(Object.keys(notificationsArr[0])[i].toUpperCase());
        	                     row.append(headerCell);
        	                 });


        	                 notificationsArr.forEach(function(value, i) {
        	                     row = $(table[0].insertRow(-1));
        	                     columnCountArr.forEach(function(value, j) {
        	                         var cell = $("<td />");
        	                         cell.html(Object.values(notificationsArr[i])[j]);
        	                         row.append(cell);
        	                     });
        	                 });

        	                 var dvTable = $("#markerNotificationInfoModelBody");
        	                 dvTable.html("");
        	                 dvTable.append(table);
        	                 $('#markerNotificationInfo').modal('show');
        	             }
        	             newText2.onclick = function(){
        	            	 
        	            	 var plantInfo = "Alert Notifications of " + site.plants[i].name.toUpperCase(); 
        	                 $("#markerNotificationPlantInfo").html(plantInfo);
        	                 var table = $("<table />");
        	                 table.addClass("table table-responsive table-striped");
        	                 var columnCountArr = [1, 2, 3, 4, 5];
        	                 var notificationsArr = site.plants[i].notifications;

        	                 var row = $(table[0].insertRow(-1));

        	                 columnCountArr.forEach(function(value, i) {
        	                     var headerCell = $("<th />");
        	                     headerCell.html(Object.keys(notificationsArr[0])[i].toUpperCase());
        	                     row.append(headerCell);
        	                 });


        	                 notificationsArr.forEach(function(value, i) {
        	                     row = $(table[0].insertRow(-1));
        	                     columnCountArr.forEach(function(value, j) {
        	                         var cell = $("<td />");
        	                         cell.html(Object.values(notificationsArr[i])[j]);
        	                         row.append(cell);
        	                     });
        	                 });

        	                 var dvTable = $("#markerNotificationInfoModelBody");
        	                 dvTable.html("");
        	                 dvTable.append(table);
        	                 $('#markerNotificationInfo').modal('show');
        	             }

        	             newText2.setAttribute("data-toggle", "modal");
        	             newText2.setAttribute("style", "text-decoration: underline; color: blue; cursor:pointer;");
        	             
        	             newText1.setAttribute("data-toggle", "modal");
        	             newText1.setAttribute("style", "text-decoration: underline; color: blue; cursor:pointer;");
        	         }

        	         newText2.innerHTML = site.plants[i].notifications.length;
        	         newCell2.appendChild(newText2); 
        	     }
        	     table.appendChild(tbody);
        	     return table;

        	 }
        	 
        	
        	$scope.setMap = function() {

                let map = L.map('map', {
                    zoomControl: false
                }).setView([24.507143, 44.408798], 15);
                L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>'
                }).addTo(map);

                L.icon = function(options) {
                    return new L.Icon(options);
                };

                map.options.maxZoom = 5;
                map.options.minZoom = 5;
                return map;
            }


            $scope.setmarkersIcons = function(site) {

                /*<![CDATA[*/
                var nots = [];
                for (var i = 0; i < site.plants.length; i++) {
                    nots = nots.concat(site.plants[i].notifications);
                }

                /*]]>*/

                var prioritiesArr = nots.map(function(item) {
                    return item.priority
                });

                if (prioritiesArr.includes("PRIORITY 1")) {
                    return "assets/img/map_marker-red.png";
                } else if (prioritiesArr.includes("PRIORITY 2")) {
                    return "assets/img/map_marker-blue.png";
                } else {
                    return "assets/img/map_marker-green.png";
                }

            }

            $scope.setMarkers = function(sites) {
                sites.forEach((site) => {
                	var tbl = $scope.setSitePopup(site);
                    var markerIcon = L.icon({
                        iconUrl: $scope.setmarkersIcons(site),
                        //shadowUrl: 'assets/img/leaf-shadow.png',
                        iconSize: [45, 55],
                        iconAnchor: [22, 94],
                        shadowAnchor: [4, 62],
                        popupAnchor: [-3, -76]
                    });
                    var mkr = L.marker([site.site.longitude, site.site.latitude], {
                        icon: markerIcon,
                        title: site.site.name
                    })

                    mkr.bindPopup(tbl);
                    mkr.addEventListener("click", function() {
                    	$scope.setSelectedSite(site.site);
                    	$scope.$apply();
                    });
                    
                    mkr.addTo($scope.map);
                    
                });
                $scope.map.panTo(new L.LatLng(30.983334, 41.016666));
   
            }

            $scope.map = $scope.setMap();
            $scope.$watch('isSiteLoaded', function(newValue, oldValue) {
                if ($scope.isSiteLoaded && $scope.sites[0] && $scope.sites[0].site) {
                    $scope.setMarkers($scope.sites)
                }
            });
        }
    };
}]);