'use strict';

angular.module('charter.users', ['ngRoute', 'ngCookies'])

.controller('UsersCtrl', ['$state', '$rootScope', '$cookies', '$http', function($state, $rootScope, $cookies,  $http) {

  var vm = this;
  
  vm.get_users = function() {
    var data = { "username" : vm.username, "password" : vm.password }
    $http.get("http://" + $rootScope.apiserver_ip +":" + $rootScope.apiserver_port + "/users/", {
      headers: {
        'Content-Type': "application/json"
      }
    }).then(function(resp) {
      console.log(resp);
      vm.data=resp.data.users;
    },function(resp) {
      console.log(resp);
    })}
vm.get_users();
  
}]);