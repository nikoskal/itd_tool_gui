(function(){

  angular
    .module('app')
    .controller('HistoryController', [
        '$http','$scope','$location','$anchorScroll',
        HistoryController
      
    ]);

  var vm = this;
  vm.totalItems = 0;



  function HistoryController($http, $scope, $location, $anchorScroll) {
    var vm = this;
      // $scope.discoverKwdData = [];
      // $scope.discoverVolumeData = [];
      // $scope.discoverTimeInterestData = [];
      vm.historyList = [];
      vm.activated = false;
      $scope.historyKwdData = [];
      $scope.historyRelatedData = [];
      $scope.historyVolumeData = [];
      $scope.historyTimeInterestData = [];
      $scope.historyQuestionData = [];

      $scope.isLoading =  false;
      $scope.historyRegionInterestData = [];
      $scope.keyword = {};
      $scope.description = {};
      $scope.historyRisingData = [];
      $scope.historyTweets = [];
      vm.queriesData = [];
      vm.activated = false;
      $scope.discoverTweetsGender  = {};
      $scope.description = {};
      $scope.timeInterestChartLineData = [];



      function sortByKey(array, key) {
          return array.sort(function(a, b) {
              var x = a[key]; var y = b[key];
              return ((x < y) ? -1 : ((x > y) ? 1 : 0));
          });
      }

      function populate_timeInterestChartData(time_interest_lst) {

          var unordered_val = [];
          var ordered_val = [];
          var time_interest_lst_length = time_interest_lst.length;
          for (var i = 0; i < time_interest_lst_length; i++) {
              var time_interest = time_interest_lst[i];
              var date = time_interest_lst[i].date;
              var formatDate = d3.time.format('%Y-%m-%d');
              var dtObj = formatDate.parse(String(date));
              var time = +dtObj;
              unordered_val.push({x: time, y:time_interest_lst[i].interest });
          }
          ordered_val = sortByKey(unordered_val,"x");

          return [{values: ordered_val, color: 'blue', area: false}];
      }


      $scope.timeInterestChartOptions = {
          chart: {
              type: 'lineChart',
              height: 210,
              margin: { top: 20, left: 40, right: 40 },
              x: function (d) {return d.x;},
              y: function (d) {return d.y; },
              showLabels: false,
              showLegend: false,
              title: 'xxx',
              showYAxis: true,
              showXAxis: true,
              xAxis: {
                  axisLabel: "Date",
                  showMaxMin: true,
                  tickFormat: function(d) { return d3.time.format('%d-%m-%Y')(new Date(d)); }
                  },
              yAxis: {
                  axisLabel: "Interest",
                  showMaxMin: true
              }
          }
      };

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


      $scope.reloadRoute = function() {
          window.location.reload(true);
      };


      function retrieveHistoryList() {

          $http.get(DJANGO_SERVICE_URL+'/history/').then(function (response) {
              // var unsorted_his_list = response.data;
              // console.log("unsorted_his_list ", unsorted_his_list[0].execution_date );

              vm.historyList = response.data;
              console.log("sorted_his_list ", vm.historyList );
          });
      }
      retrieveHistoryList();


      $scope.deleteHistory = function(queryId) {

          $http.delete(DJANGO_SERVICE_URL+'/history/'+queryId+"/")
              .then(function successCallback(response) {
                  // console.log("inside success deleteHistory response ",response );
              }, function errorCallback(response) {
                  // console.log("inside error deleteHistory response ", response );
              });
          $scope.reloadRoute();
      };




      $scope.retrieveHistory = function(queryId) {

          $location.hash('top');
          $anchorScroll();

          $http.get(DJANGO_SERVICE_URL+'/history/'+queryId)
              .then(function successCallback(response) {
                  // console.log("inside success discover hoc response", response.data.execution_date );

                  $scope.historyRelatedData = response.data.results.related_queries_list.top;
                  $scope.historyRisingData = response.data.results.related_queries_list.rising;
                  $scope.historyVolumeData = response.data.results.volume_list;
                  $scope.historyTimeInterestData = response.data.results.time_interest_list;

                  // $scope.populate_timeInterestChartData(response.data.results.time_interest_list);
                  $scope.timeInterestChartLineData = populate_timeInterestChartData($scope.historyTimeInterestData);

                  $scope.historyRegionInterestData = response.data.results.interest_over_region;
                  $scope.historyQuestionData = response.data.results.autocomplete;
                  console.log("QuestionData quest: ", $scope.historyQuestionData);

                  // var quest_len = $scope.historyQuestionData.length;
                  // for (var i = 0; i < quest_len; i++) {
                  //     var quest = $scope.historyQuestionData[i];
                  //     console.log("QuestionData quest: ", quest.did);
                  // }




                  $scope.historyTweets = response.data.results.tweets.popular_tweets;
                  $scope.historyTweetsGender = response.data.results.tweets.tweet_gender_prob;
                  if( $scope.discoverTweetsGender ) {
                      $scope.show_gender = true;
                  }
                  $scope.populate_pie($scope.historyTweetsGender.male ,$scope.historyTweetsGender.female,
                      $scope.historyTweetsGender.unknown, $scope.historyTweetsGender.total_records);

                  $scope.description = response.data.query_desc;
                  $scope.keyword = response.data.keyword;

                  // console.log("query related_kwd_list: ", $scope.historyRelatedData);
                  // console.log("query volume: ", $scope.historyVolumeData);
                  // console.log("query discoverTimeInterestData: ", $scope.historyTimeInterestData);
                  // console.log("query historyRegionInterestData: ", $scope.historyRegionInterestData);
                  // console.log("query historyQuestionData: ", $scope.historyQuestionData);
                  // console.log("query historyTweets: ", $scope.historyTweets);
                  // console.log("query historyTweetsGender: ", $scope.historyTweetsGender);
                  }, function errorCallback(response) {
                  console.log("inside error discover response", response );
              });

      };

      $scope.showPopover = function() {
          $scope.popoverIsVisible1 = true;
          $scope.popoverIsVisible2 = true;
      };

      $scope.hidePopover = function () {
          $scope.popoverIsVisible1 = false;
          $scope.popoverIsVisible2 = false;
      };


  }
})();