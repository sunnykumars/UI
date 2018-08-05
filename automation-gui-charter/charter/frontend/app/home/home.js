'use strict';

angular.module('charter.home', ['ngRoute', 'ngCookies'])

.controller('HomeCtrl', ['$rootScope', '$http', '$cookies', function($rootScope, $http, $cookies) {

	var vm = this;
	
	vm.getUsers = function() {
		var token = $cookies.get('access_token');
    	$http.get("http://" + $rootScope.apiserver_ip +":" + $rootScope.apiserver_port + "/users", {
      		headers: {
        		'Authorization': 'Bearer ' + token
      		}
    	}).then(function(resp) {
      			console.log(resp);
      			vm.users = resp.data;
    	},function(resp) {
      			console.log(resp);
				var token = $cookies.get('refresh_token');
      			var data = "grant_type=refresh_token&client_id=" + $rootScope.client_id + "&client_secret=" + $rootScope.client_secret + "&refresh_token=" + token;
	    		$http.post("http://" + $rootScope.apiserver_ip +":" + $rootScope.apiserver_port + "/o/token/", data, {
    	  			headers: {
        				'Content-Type': "application/x-www-form-urlencoded"
      					}
    			}).success(function(resp) {
	      			console.log(resp);
              $rootScope.loggedIn = true;

	      			$cookies.put("access_token", resp.data.access_token);
      				$cookies.put("refresh_token", resp.data.refresh_token);
	    		})
    	})
  }
  
  console.log($cookies.get('access_token'));

  if($cookies.get('access_token')) {
  	vm.getUsers();
  }

}]);