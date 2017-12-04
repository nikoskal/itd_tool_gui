(function(){

  angular
    .module('app')
    .controller('TrendsController', [
        '$http','$scope',
        TrendsController
      
    ]);

  var vm = this;
  vm.totalItems = 0;


  function TrendsController($http, $scope) {
    var vm = this;
      $scope.discoverKwdData = [];
      $scope.discoverRelatedData = [];
      $scope.discoverVolumeData = [];
      $scope.discoverTimeInterestData = [];
      $scope.discoverQuestionDataIs = [];
      $scope.discoverQuestionDataDid = [];
      $scope.discoverTweets = [];
      vm.queriesData = [];
      vm.activated = false;
      $scope.isLoading =  false;
      $scope.discoverRegionInterestData = [];
      $scope.keyword = {};


      // $scope.reverseSortRegion = false;
      // $scope.orderByFieldInt = 'interest';

      // $scope.discoverTimeInterestData =
      //     [{'date': '2016-09-11', 'interest': 20}, {'date': '2017-06-11', 'interest': 2}, {'date': '2017-07-30', 'interest': 3},
      //         {'date': '2016-04-03', 'interest': 5}, {'date': '2015-05-17', 'interest': 3}]
      //
      // $scope.discoverVolumeData =  [{'count': 450000, 'month': 8, 'year': 2017}, {'count': 673000, 'month': 7, 'year': 2017},
      //         {'count': 450000, 'month': 6, 'year': 2017}, {'count': 550000, 'month': 5, 'year': 2017},
      //         {'count': 673000, 'month': 4, 'year': 2017}, {'count': 823000, 'month': 3, 'year': 2017},
      //         {'count': 1000000, 'month': 2, 'year': 2017}, {'count': 1830000, 'month': 1, 'year': 2017},
      //         {'count': 2240000, 'month': 12, 'year': 2016}]


      $scope.clearalldata = function() {
          $scope.discoverKwdData = [];
          $scope.discoverRelatedData = [];
          $scope.discoverVolumeData = [];
          $scope.discoverTimeInterestData = [];
          $scope.discoverQuestionDataIs = [];
          $scope.discoverQuestionDataDid = [];
          $scope.discoverTweets = [];
          $scope.discoverRegionInterestData = [];
          $scope.keyword = {};

      };

      function retrieveAllQueries() {

          $http.get('http://127.0.0.1:8000/query-parameters/').then(function (response) {
              vm.queriesData = response.data;
          });
          // reset_data();
      }
      retrieveAllQueries();



      $scope.discover = function(queryId, keyword) {

          console.log("inside discover",  queryId);
          $scope.clearalldata();
          $scope.isLoading = true;
          $scope.keyword = keyword;

          $http.get('http://127.0.0.1:8000/discover/'+queryId)
              .then(function successCallback(response) {
                  $scope.isLoading = false;
                  console.log("inside success discover response", response );


                  $scope.discoverRelatedData = response.data.related_queries_list.top;
                  $scope.discoverVolumeData = response.data.volume_list;
                  $scope.discoverTimeInterestData = response.data.time_interest_list;
                  $scope.discoverRegionInterestData = response.data.interest_over_region;
                  $scope.discoverQuestionDataIs = response.data.autocomplete[0];
                  $scope.discoverQuestionDataDid = response.data.autocomplete[1];
                  $scope.discoverTweets = response.data.tweets;

                  console.log("query related_kwd_list: ", $scope.discoverRelatedData);
                  console.log("query volume: ", $scope.discoverVolumeData);
                  console.log("query discoverTimeInterestData: ", $scope.discoverTimeInterestData);
                  console.log("query discoverTimeInterestData: ", $scope.discoverRegionInterestData);
                  console.log("query discoverQuestionDataIs: ", $scope.discoverQuestionDataIs);
                  console.log("query discoverQuestionDataIs: ", $scope.discoverQuestionDataDid);

                  }, function errorCallback(response) {
                  console.log("inside error discover response", response );
                  $scope.isLoading = false;
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
