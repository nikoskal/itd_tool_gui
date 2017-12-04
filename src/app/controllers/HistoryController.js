(function(){

  angular
    .module('app')
    .controller('HistoryController', [
        '$http','$scope',
        HistoryController
      
    ]);

  var vm = this;
  vm.totalItems = 0;


  function HistoryController($http, $scope) {
    var vm = this;
      $scope.discoverKwdData = [];
      $scope.discoverVolumeData = [];
      $scope.discoverTimeInterestData = [];
      vm.queriesData = [];
      vm.activated = false;





      function retrieveAllQueries() {

          $http.get('http://127.0.0.1:8000/query-parameters/').then(function (response) {
              vm.queriesData = response.data;
          });
          // reset_data();
      }
      retrieveAllQueries();




      $scope.discover = function(queryId) {

          console.log("inside discover",  queryId);

          $http.get('http://127.0.0.1:8000/discover/'+queryId)
              .then(function successCallback(response) {
                  console.log("inside success discover response", response );


                  $scope.discoverRelatedData = response.data.related_queries_list.top;
                  $scope.discoverVolumeData = response.data.volume_list;
                  $scope.discoverTimeInterestData = response.data.time_interest_list;
                  $scope.discoverRegionInterestData = response.data.interest_over_region;

                  console.log("query related_kwd_list: ", $scope.discoverRelatedData);
                  console.log("query volume: ", $scope.discoverVolumeData);
                  console.log("query discoverTimeInterestData: ", $scope.discoverTimeInterestData);
                  console.log("query discoverTimeInterestData: ", $scope.discoverRegionInterestData);

                  }, function errorCallback(response) {
                  console.log("inside error discover response", response );
              });


          console.log("query volume");

          // $http.get('http://127.0.0.1:8000/google-adwords/snowden/location/Unitedstates')
          //     .then(function successCallback(response) {
          //         console.log("inside success  discoverVolumeData response", response );
          //         $scope.discoverVolumeData = response;
          //     }, function errorCallback(response) {
          //         console.log("inside error discoverVolumeData response", response );
          //     });
      };


  }

})();
