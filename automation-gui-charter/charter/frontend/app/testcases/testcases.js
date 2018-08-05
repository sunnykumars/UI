'use strict';

angular.module('charter.testcases', ['ngRoute', 'ngCookies', 'ngCsv'])

.controller('TestcasesCtrl', ['$state', '$rootScope', '$cookies', '$http','$modal','$interval', function($state, $rootScope, $cookies,  $http, $modal, $interval) {

  var vm = this;
  vm.itemsByPage = 10;

  vm.getLogs = function(logs){
    console.log(logs);
    $modal.open({
      size: 'lg',
      templateUrl: 'testcases/logstc-dialog.html',
      controller: ['$modalInstance', 'logs', LogsModalCtrl],
      controllerAs: 'vm',
      resolve: {
        logs: function(){
          return logs;
        }
      }
    });
  }

  vm.getHistory = function(history){
    console.log(history);
    $modal.open({
      templateUrl: 'testcases/history-dialog.html',
      controller: ['$modalInstance', 'history', HistoryModalCtrl],
      controllerAs: 'vm',
      resolve: {
        history: function(){
          return history;
        }
      }

    });
  }
  
  vm.export=function() {
    $('#Testcasetable').tableExport({type:'csv',escape:'false'});
    //{type:'csv',escape:'false'}
//{type:'txt',escape:'false'}
//{type:'excel',escape:'false'}
//{type:'doc',escape:'false'}
//{type:'powerpoint',escape:'false'}
  }

  vm.get_testcases = function() {
    var data = { "username" : vm.username, "password" : vm.password }
    $http.get("http://" + $rootScope.apiserver_ip +":" + $rootScope.apiserver_port + "/testcases/", {
      headers: {
        'Content-Type': "application/json"
      }
    }).then(function(resp) {
      console.log(resp);
      vm.data=resp.data.testcases;
    },function(resp) {
      console.log(resp);
    })}

  vm.get_testcases();
  //$interval(vm.get_testcases, 5000);
  
  vm.execute_testcases = function()  {
   for(var i=0; i<vm.data.length; i++){
     if (vm.data[i].isSelected){
       console.log(vm.data[i])
       vm.data[i].status = "In Progress";
       $http.post("http://" + $rootScope.apiserver_ip +":" + $rootScope.apiserver_port + "/ltetest1/" + vm.data[i].test_case_no)
       .then(function(resp){
         console.log(resp);
         vm.get_testcases();

       },function(resp) {
         console.log(resp);
         vm.get_testcases();
       }
      );
   }
 }}
}])

.directive('csSelect', function () {
  return {
      require: '^stTable',
      template: '<input type="checkbox"/>',
      scope: {
          row: '=csSelect'
      },
      link: function (scope, element, attr, ctrl) {

          element.bind('change', function (evt) {
              scope.$apply(function () {
                  ctrl.select(scope.row, 'multiple');
              });
          });

          scope.$watch('row.isSelected', function (newValue, oldValue) {
              if (newValue === true) {
                  element.parent().addClass('st-selected');
              } else {
                  element.parent().removeClass('st-selected');
              }
          });
      }
  };
})

.directive('stExport',[ function(csv) {
  return {
    require:'^stTable',
    link:function(scope, element, attr, smartTable) {
      element.bind('click',function() {
        alert(ctrl.getFilteredCollection().length);
      })
    }
  }
}])


function LogsModalCtrl($modalInstance, logs) {
  var vm = this;
  vm.logs = logs;
  console.log(vm.logs)
}

function HistoryModalCtrl($modalInstance, history) {
  var vm = this;
  vm.history = history;
  console.log(vm.history)
}

