(function(){

  angular
    .module('app')
    .controller('TrendsController', [
        '$http','$scope', '$location', '$anchorScroll',
        TrendsController
      
    ]);

  var vm = this;
  vm.totalItems = 0;


  function TrendsController($http, $scope, $location, $anchorScroll) {
    var vm = this;
      $scope.discoverKwdData = [];
      $scope.discoverRelatedData = [];
      $scope.discoverVolumeData = [];
      $scope.discoverTimeInterestData = [];
      $scope.discoverQuestionData = [];
      $scope.discoverTweets = [];
      $scope.isLoading =  false;
      $scope.discoverRegionInterestData = [];
      $scope.keyword = {};
      $scope.description = {};
      $scope.discoverRisingData = [];
      $scope.discoverTweets = [];
      vm.queriesData = [];
      vm.activated = false;


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
          $scope.discoverRisingData = [];
          $scope.discoverVolumeData = [];
          $scope.discoverTimeInterestData = [];
          $scope.discoverQuestionData = [];
          $scope.discoverTweets = [];
          $scope.discoverRegionInterestData = [];
          $scope.keyword = {};
          $scope.description = {};

          $scope.call_duration = {};
      };

      function retrieveAllQueries() {

          $http.get(DJANGO_SERVICE_URL+'/query-parameters/').then(function (response) {
              vm.queriesData = response.data;
          });
          // reset_data();
      }
      retrieveAllQueries();



      $scope.discover = function(queryId, keyword, description) {

          console.log("inside discover",  queryId);
          $scope.clearalldata();
          $scope.isLoading = true;
          $scope.keyword = keyword;
          $scope.description = description;

          console.log("calling scroll");
          $location.hash('top');
          $anchorScroll();
          console.log(" scrolled?");
          $scope.show_gender = false;

          $http.get(DJANGO_SERVICE_URL+'/discover/'+queryId)
              .then(function successCallback(response) {
                  $scope.isLoading = false;
                  console.log("inside success discover response", response );
                  $scope.discoverRelatedData = response.data.related_queries_list.top;
                  $scope.discoverRisingData = response.data.related_queries_list.rising;
                  $scope.discoverVolumeData = response.data.volume_list;
                  $scope.discoverTimeInterestData = response.data.time_interest_list;
                  $scope.discoverRegionInterestData = response.data.interest_over_region;
                  $scope.discoverQuestionData = response.data.autocomplete;
                  $scope.discoverTweets = response.data.tweets.popular_tweets;
                  $scope.discoverTweetsGender = response.data.tweets.tweet_gender_prob;

                  if( $scope.discoverTweetsGender ) {
                      $scope.show_gender = true;
                  }

                  $scope.call_duration = response.data.time +" sec";
                  console.log("query related_kwd_list: ", $scope.discoverRelatedData);
                  console.log("query rising: ", $scope.discoverRisingData);
                  console.log("query volume: ", $scope.discoverVolumeData);
                  console.log("query discoverTimeInterestData: ", $scope.discoverTimeInterestData);
                  console.log("query discoverRegionInterestData: ", $scope.discoverRegionInterestData);
                  console.log("query discoverQuestionData: ", $scope.discoverQuestionData);
                  console.log("query discoverTweets: ", $scope.discoverTweets);
                  console.log("query tweet_gender_prob: ", $scope.discoverTweetsGender);
                  console.log("query call_duration: ", $scope.call_duration);

                  }, function errorCallback(response) {
                  console.log("inside error discover response", response );
                  $scope.isLoading = false;
              });

      };
  }
})();
