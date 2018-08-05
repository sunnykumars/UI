'use strict';

angular.module('charter.login', ['ngRoute', 'ngCookies'])

.controller('LoginCtrl', ['$state', '$rootScope', '$cookies', '$http', function($state, $rootScope, $cookies,  $http) {

  var vm = this;
  
  vm.wrongDetails = false;
  $rootScope.loggedIn = false;

  vm.login = function() {
    vm.dataLoading = true;
    vm.login_post();
  };


  vm.login_post = function() {
    var data = { "username" : vm.username, "password" : vm.password }
    $http.post("http://" + $rootScope.apiserver_ip +":" + $rootScope.apiserver_port + "/authenticate/", data, {
      headers: {
        'Content-Type': "application/json"
      }
    }).then(function(resp) {
      vm.dataLoading = false;
      console.log(resp);
      $rootScope.loggedIn = true;
      $state.go('home');
      $cookies.put("username", vm.username);
      $rootScope.loggedInUser = vm.username;
      $rootScope.loggedInPwd = vm.password;
    },function(resp) {
		console.log(resp)
      vm.dataLoading = false;
      vm.wrongDetails = true;
    })
  }

  vm.close = function() {
    vm.wrongDetails = false;
  };

  vm.logout = function() {
    $cookies.remove("access_token");
    $cookies.remove("refresh_token");
  }

}]);