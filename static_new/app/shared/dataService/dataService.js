 secApp.service('dataService', ['$http', function ($http) {
        this.getRecords = function (url) {
            //return $http.get(url);
        	//url = url.replace(/^http:\/\//i, 'https://');
        	return $.ajax( {url: url, async: false});
        };
        
        this.getToken = function (myUrl,grantType, myHeaders){
       	    return $.ajax({type: 'POST', url: myUrl, data: grantType, headers: myHeaders });
        }
        
        this.timeSeriesTags = function (tagUrl, myHeaders){
    	    return $.ajax({ type: 'GET', url: tagUrl, async: false,headers: myHeaders});
    	 }
        
        this.timeSeriesGraph = function (myUrl, mybody, myHeaders){
       	 return $.ajax({type: 'POST', url: myUrl, data: JSON.stringify(mybody), headers: myHeaders});
        }
        
    }]);
 
 

 
