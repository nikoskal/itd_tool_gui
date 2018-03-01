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
      $scope.discoverTweetsGender  = {};

      $scope.genderChartOptions = {
          chart: {
              type: 'pieChart',
              height: 210,
              donut: true,
              x: function (d) { return d.key; },
              y: function (d) { return d.y; },
              valueFormat: (d3.format(".0f")),
              color: ['rgb(0, 150, 136)', '#E75753','#808080' ],
              showLabels: true,
              showLegend: false,
              title: '',
              margin: { top: -10 }
          }
      };


      $scope.populate_pie = function(maled, femaled, unknowned, total ){

          $scope.genderVisitorsChartData = [ {key: 'Male', y: maled*total},
              { key: 'Female', y: femaled*total},
              { key: 'Unknown', y: unknowned*total} ];

      };


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
          //$scope.discoverTweetsGender = [];
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


          $location.hash('top');
          $anchorScroll();

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

                  if( typeof $scope.historyTweetsGender !== 'undefined' ) {
                      $scope.show_gender = true;
                      console.log("!!query tweet_gender_prob: ", $scope.discoverTweetsGender);
                      console.log("!!query tweet_gender_prob male: ", $scope.discoverTweetsGender.male);
                      console.log("!!query tweet_gender_prob female: ", $scope.discoverTweetsGender.female);
                      console.log("!!query tweet_gender_prob unknown: ", $scope.discoverTweetsGender.unknown);
                      $scope.populate_pie($scope.discoverTweetsGender.male ,$scope.discoverTweetsGender.female,
                          $scope.discoverTweetsGender.unknown, $scope.discoverTweetsGender.total_records);
                  }

                  $scope.call_duration = response.data.time +" sec";
                  console.log("query related_kwd_list: ", $scope.discoverRelatedData);
                  console.log("query rising: ", $scope.discoverRisingData);
                  console.log("query volume: ", $scope.discoverVolumeData);
                  console.log("query discoverTimeInterestData: ", $scope.discoverTimeInterestData);
                  console.log("query discoverRegionInterestData: ", $scope.discoverRegionInterestData);
                  console.log("query discoverQuestionData: ", $scope.discoverQuestionData);
                  console.log("query discoverTweets: ", $scope.discoverTweets);

                  console.log("query call_duration: ", $scope.call_duration);
                  console.log("populate_pie", $scope.visitorsChartData );

                  }, function errorCallback(response) {
                  console.log("inside error discover response", response );
                  $scope.isLoading = false;
              });

      };
  }
})();
