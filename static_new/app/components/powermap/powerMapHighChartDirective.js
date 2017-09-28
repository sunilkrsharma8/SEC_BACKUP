secApp.directive('powerMapHighChartDirective', ['dataService', function(dataService) {
    return {
        restrict: 'EA',
        replace: true,
        scope: false,
        templateUrl: 'app/components/powermap/powerMapHighChartDirective.html',
        link: function($scope, $element, $attrs){
        	$scope.graphSeriesData = [];
        	$scope.series = [];
        	$scope.chartObj = null; 	
        	$scope.generateHighchartForSite = function (site){
        		 $('button.btn').removeClass("activeDurationBtn");
        		 $('#kpiDuration').children().last().addClass("activeDurationBtn");
        		 $('#tagsDropDown option').prop('selected', true);
        	     $('#tagsDropDown').selectpicker('refresh');
        	     $scope.chartObj =  $scope.generateNotificationChart($scope.series,site.name);
        	 }
        	
        	 $scope.updateGraphSeries = function (fromDt, toDt, seriesItem){
        		 
        		  fromDt =  moment(String(fromDt)).utc().valueOf(); 
        		  toDt = moment(String(toDt)).utc().valueOf(); 
        		
        		 /*<![CDATA[*/
        		return  seriesItem.data.filter(function(x) {
        		    return x[0] > toDt && x[0] < fromDt;
        		});
        		  /*]]>*/	 
        	 }
        	
        	 $scope.filterGraphSeries = function (selectedInterVal){
        		 var fromDt = parseInt(moment().format('YYYYMMDD'));          			  
    			 var toDt =  parseInt(moment().subtract(selectedInterVal, 'd').format('YYYYMMDD'));
        		 $scope.newSeries = [];
        		 $scope.fromDt = fromDt;
        		 $scope.toDt = toDt;
        		 $scope.series.forEach((seriesItem)=>{
        			 let serArr =  $scope.updateGraphSeries($scope.fromDt, $scope.toDt, seriesItem);
        			 $scope.newSeries.push({name: seriesItem.name, data: serArr});
        		 }); 
        		 
        		 $scope.newSeries.forEach((data,i)=>{ 
        			 $scope.chartObj.series[i].update(data);
        		});  
        	 }
        	 
        	$scope.kpiDuration = function(e){
        		 $('button.btn').removeClass("activeDurationBtn");
        		 $(e.target).addClass("activeDurationBtn");
        		 $scope.filterGraphSeries(parseInt(e.target.value));
        	}
        	
        	$scope.onChangeTagsSelection = function () {
        		 if($scope.chartObj.series){
        			 $scope.chartObj.series.forEach((ser)=>{ 
        				   
        				   if($('#tagsDropDown').val()){
        					   
        					   if($('#tagsDropDown').val().indexOf(ser.name)==-1){
        						   ser.hide(); 
        					   } else{
        						   ser.show(); 
        					   } 
        					   
        				   } else{
        					   ser.hide();   
        				   }
        				    
        			   }); 
        		 }
        	}
        	
        	$scope.generateNotificationChart = function (series,siteName){
        		 
        			return 	Highcharts.chart('container', {
        			    chart: {
        			        type: 'spline'
        			    },
        			    title: {
        			        text: siteName + ' Statistics'
        			    },
        			    subtitle: {
        			        text: 'Time data in unit'
        			    },
        			    xAxis: {
        			        type: 'datetime',
        			        dateTimeLabelFormats: {
        			            month: '%e. %b',
        			            year: '%b'
        			        },
        			        title: {
        			            text: 'Date'
        			        }
        			    },
        			    yAxis: {
        			        title: {
        			            text: 'Unit'
        			        },
        			        min: 0
        			    },
        			   

        			    plotOptions: {
        			        spline: {
        			            marker: {
        			                enabled: true
        			            }
        			        },
        			         series: {
        		                events: {
        		                    legendItemClick: function (event) {
        		                        
        		                        let chart = this.chart,
        		                            index = this.index;
        		                                                
        		                        	 /*<![CDATA[*/         
        		                        	  for(var i = 0; i < chart.series.length; i++){
        		                        		if(  ($('#tagsDropDown option')[chart.series[i].index].text === chart.series[i].name) && (event.target.userOptions.name === chart.series[i].name))
        		  	                            {
        		  	                     
        		  	                            	$('#tagsDropDown option')[chart.series[i].index].selected = !chart.series[i].visible;
        		  	                                
        		  	                            }  
        		                        	  }
        		                        	 
        		                            /*]]>*/  
        		                        $('#tagsDropDown').selectpicker('refresh');
        		                    }
        		                } 
        		            } 
        			    },

        			    series: series
        			});
        			
        	}
        	 
        	 
        	$scope.formGraphData = function (tags){
        		 
        		 tags.forEach(tag =>{ 
        			 var seriesObj = {name:tag.name, data: []};
        			 tag.results[0].values.forEach((data)=>{
        			      let arr = [];
         
	       			      var str=String(data[0]);
	       			      var year=str.substr(0, 4);
	       			      var mm=str.substr(4, 2);
	       			      var date=str.substr(6, 8);
	       			     arr.push(moment(String(data[0])).utc().valueOf());
	       			     arr.push(data[1]);
	       				 seriesObj.data.push(arr);
        				 
        			 }); 
        			 if(seriesObj.data.length){
        				 $scope.graphSeriesData.push(seriesObj);	
        			 } 
        		});
        		 
        		 $scope.graphSeriesData.forEach((data,i)=>{ 
        			 $scope.series.push(data);
        		});

        	   $scope.chartObj = $scope.generateNotificationChart($scope.series,$scope.selectedSite.name);
        	 }
        	
        	
        	$scope.getGraphData = function(){
        		$scope.authorization = 'Basic Y2xpZW50MTpjbGllbnQx';
        		$scope.tokenUrl = 'https://826c3371-0c16-4ef6-933d-b30d2823f0eb.predix-uaa.run.aws-usw02-pr.ice.predix.io/oauth/token';
        		$scope.grantType =  {'grant_type': 'client_credentials','username': 'client1', 'password': 'client1'};
        		$scope.tagUrl = 'https://time-series-store-predix.run.aws-usw02-pr.ice.predix.io/v1/tags';
        		$scope.tokenHeaders = {
        				 'Authorization' :  $scope.authorization,
        		         'Content-Type' : 'application/x-www-form-urlencoded'
        		       };
        		  
        		dataService.getToken($scope.tokenUrl,$scope.grantType,$scope.tokenHeaders).then((data)=>{
        			
        			$scope.myAuthorization = 'Bearer '+data.access_token;
        			 var selectedDays = parseInt($('#kpiDuration').children().last().val());
        			 $scope.myHeaders = {
        			         'Authorization' :  $scope.myAuthorization,
        			         'Content-Type' : 'application/x-www-form-urlencoded',
        			         'Predix-Zone-Id': '70f006d1-e9c2-4f21-a1df-06144460eedc'
        			       };
        			 $scope.myUrl = 'https://time-series-store-predix.run.aws-usw02-pr.ice.predix.io/v1/datapoints';
        			 $scope.mybody = {
        				     "cache_time": 0,
        						  "tags": [],
        						"start": parseInt(moment().subtract(selectedDays, 'd').format('YYYYMMDD')),
        						"end": parseInt(moment().format('YYYYMMDD')) 
        				}; 
        			 
        			 dataService.timeSeriesTags($scope.tagUrl, $scope.myHeaders).then((data)=>{ 
        			    	
        				 $scope.selectTags = []
        			    	 data.results.forEach((tag)=>{
        			    			 $scope.selectTags.push({"name": tag, "order": "asc"});
        				    		 $("#tagsDropDown").append('<option data-tokens="'+tag+'" value="'+tag+'">'+ tag +'</option>');   
        			    	 });
        					 $('#tagsDropDown option').prop('selected', true);
        				     $('#tagsDropDown').selectpicker('refresh');
        				     $scope.mybody.tags = $scope.selectTags
        				     dataService.timeSeriesGraph($scope.myUrl, $scope.mybody, $scope.myHeaders).then((data)=>{
        				    	  $scope.formGraphData(data.tags);
        						 });
        			    });
        			        			
        			
        		});
        		
        		
        	}
        	
        	 $scope.$watch('isSiteLoaded', function(newValue, oldValue) {
                 if ($scope.isSiteLoaded && $scope.sites[0] && $scope.sites[0].site) {
                	 $scope.selectedSite = $scope.sites[0].site;
                	 $scope.getGraphData();
                 }
             });
        	 
        	 
        	 $scope.$watch('isSelectedSiteToggle', function(newValue, oldValue) {
                 if ($scope.selectedSite && $scope.selectedSite.name && newValue!==oldValue) {
                	 $scope.generateHighchartForSite($scope.selectedSite);
                 }
             });
        	 
        	 
        }
    };
}]);