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
      $scope.volumeChartLineData = [];
      $scope.regionChartData = [];
      $scope.graphTopChartData = {};
      $scope.graphRisingChartData = {};

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

      function populate_volumeChartData(volume_lst) {

          var unordered_val = [];
          var ordered_val = [];
          var volume_interest_lst_length = volume_lst.length;
          for (var i = 0; i < volume_interest_lst_length; i++) {
              var time_interest = volume_lst[i];
              var year = volume_lst[i].year;
              var month = volume_lst[i].month;
              var formatDate = d3.time.format('%Y-%m');
              var dtObj = formatDate.parse(String(year+"-"+month));
              var time = +dtObj;
              unordered_val.push({x: time, y:volume_lst[i].count });
          }
          ordered_val = sortByKey(unordered_val,"x");

          return [{values: ordered_val, color: 'blue', area: false}];
      }





      $scope.volumeChartOptions = {
          chart: {
              type: 'lineChart',
              height: 220,
              margin: { top: 30, left: 60, right: 60 },
              x: function (d) {return d.x;},
              y: function (d) {return d.y; },
              showLabels: false,
              showLegend: false,
              title: 'xxx',
              showYAxis: true,
              showXAxis: true,
              xAxis: {
                  axisLabel: "Date (Month/Year)",
                  showMaxMin: true,
                  tickFormat: function(d) { return d3.time.format('%m-%Y')(new Date(d)); }
              },
              yAxis: {
                  axisLabel: "Number of searches",
                  showMaxMin: true
              }
          }
      };


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

      $scope.regionChartOptions = {
          chart: {
              type: 'multiBarHorizontalChart',
              height: 810,
              x: function (d) { return d.label; },
              y: function (d) { return d.value; },
              valueFormat: (d3.format("d")),
              color: ['rgb(0, 150, 136)', '#E75753','#808080' ],
              showLabels: true,
              showLegend: true,
              showControls: false,
              title: '',
              margin: { top: 20, left: 100, right: 10 },
          }
      };



      // var color_top = d3.scale.category20c();
      var color_top = d3.scale.category20c();
      $scope.graphTopChartOptions = {
          chart: {
              type: 'forceDirectedGraph',
                  height: 450,
                  width: (function(){ return nv.utils.windowSize().width - 350 })(),
                  margin:{top: 20, right: 20, bottom: 20, left: 20},
              color: function(d){
                  return color_top(d.group);
              },
              charge: -300,
                  tooltip: {
                  contentGenerator: function (key, x, y, e, graph) {
                      var ttContent = $scope.getTooltilContent(key);

                      return '<div class="nvd3-tooltip-wls">'+ttContent+'</div>';
                  }
              },
              nodeExtras: function(node) {
                  node && node
                      .append("text")

                      .text(function(d) { return d.name })
                      .style('font-size', '14px');
              }
          }
      };

      var color_rising = d3.scale.category10();
      $scope.graphRisingChartOptions = {
          chart: {
              type: 'forceDirectedGraph',
              height: 450,
              width: (function(){ return nv.utils.windowSize().width - 350 })(),
              margin:{top: 20, right: 20, bottom: 20, left: 20},
              color: function(d){
                  return color_rising(d.group);},


              charge: -200,
              gravity: 0.1,
              radius: 10,
              tooltip: {
                  contentGenerator: function (key, x, y, e, graph) {
                      var ttContent = $scope.getTooltilContent(key);

                      return '<div class="nvd3-tooltip-wls">'+ttContent+'</div>';
                  }
              },
              nodeExtras: function(node) {
                  node && node
                      .append("text")
                      .text(function(d) { return d.name })
                      .style('font-size', '16px');
              }
          }
      };



      $scope.sentimentChartOptions = {
          chart: {
              type: 'pieChart',
              height: 210,
              donut: true,
              x: function (d) { return d.key; },
              y: function (d) { return d.y; },
              valueFormat: (d3.format(".0f")),
              color: ['#cc3300', '#ff9933','grey' ],
              showLabels: true,
              showLegend: false,
              title: '',
              margin: { top: -10 }
          }
      };


      // <td md-cell>{{relateddata.query}}</td>
  //     <td md-cell>{{relateddata.value}}</td>


      function populate_graphChartData (relateddata_list, flag_rising){

          // console.log("$scope.keyword.toString() ", $scope.keyword.toString() );
          var nodes = [{"name":$scope.keyword.toString(), "group":1}];
          var links = [];


          var terms_data_lst_len = relateddata_list.length;
          for (var i = 0; i < terms_data_lst_len; i++) {
              var one_node = {};
              var one_link = {};
              var term = relateddata_list[i].query;
              var value = relateddata_list[i].value;
              if (flag_rising){ value = value/100;}

              var term_cleared = term.replace($scope.keyword.toString().toLowerCase() , "");
              one_node = {"name":term_cleared, "group":1};
              nodes.push(one_node);
              one_link = {"source":0, "target":i, "value":value };
              links.push(one_link);
          }
          var graphChartData = {"nodes":nodes, "links":links};
          // console.log("graphChartData ", graphChartData );
          return graphChartData;
      }



      function populate_regionChartData (countries_data_lst){

          var values = [];
          var countries_data_lst_len = countries_data_lst.length;
          for (var i = 0; i < countries_data_lst_len; i++) {
              var one_result = {};
              var region = countries_data_lst[i].region;
              var interest = countries_data_lst[i].interest;
              one_result = {"label":region, "value":interest};
              values.push(one_result);
          }
          var results = [
              {
                  values: values
              }];
          return results;
      }


      $scope.populate_pie = function(maled, femaled, unknowned, total ){

          $scope.genderVisitorsChartData = [ {key: 'Male', y: maled*total},
              { key: 'Female', y: femaled*total},
              { key: 'Unknown', y: unknowned*total} ];
      };

      $scope.populate_pie_sentiment = function(pos, neg, neu ){

          $scope.sentimentVisitorsChartData = [ {key: 'Positive Tweets', y: pos},
              { key: 'Negative Tweets', y: neg},
              { key: 'Neutral Tweets', y: neu} ];
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


      $scope.exportHistory = function(queryId) {
          console.log("1 inside success exportHistory response ",queryId );

          window.open(DJANGO_SERVICE_URL+'/history_export/'+queryId+'/', "_blank");

      };



          // $http.get(DJANGO_SERVICE_URL+'/history_export/'+queryId+'/', {
          //     headers : {'Content-type' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'},
          //     responseType: 'arraybuffer' })
          //     .then(function successCallback(response) {
          //         console.log("2 inside success exportHistory response ",response );
          //         var file = new Blob([ response ], {
          //             type : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          //         });
          //
          //         var fileURL = URL.createObjectURL(file);
          //         var a         = document.createElement('a');
          //         a.href        = fileURL;
          //         a.target      = '_blank';
          //         a.download    = 'yourfilename.xlsx';
          //         document.body.appendChild(a);
          //         a.click();
          //
          //         }, function errorCallback(response) {
          //         console.log("3 inside error exportHistory response ", response );
          //     });

      // };
      // $http.post('Api/DownloadURL',$scope.data,{responseType:'arraybuffer'})


      $scope.retrieveHistory = function(queryId) {

          $location.hash('top');
          $anchorScroll();

          $http.get(DJANGO_SERVICE_URL+'/history/'+queryId)
              .then(function successCallback(response) {
                  // console.log("inside success discover hoc response", response.data.execution_date );
                  $scope.keyword = response.data.keyword;
                  $scope.historyRelatedData = response.data.results.related_queries_list.top;
                  $scope.historyRisingData = response.data.results.related_queries_list.rising;
                  $scope.historyVolumeData = response.data.results.volume_list;
                  // $scope.historyTimeInterestData = response.data.results.time_interest_list;
                  $scope.timeInterestChartLineData = populate_timeInterestChartData(response.data.results.time_interest_list);
                  $scope.volumeChartLineData = populate_volumeChartData(response.data.results.volume_list);
                  $scope.regionChartData = populate_regionChartData(response.data.results.interest_over_region);
                  $scope.graphTopChartData = populate_graphChartData(response.data.results.related_queries_list.top, false);
                  $scope.graphRisingChartData = populate_graphChartData(response.data.results.related_queries_list.rising, true);
                  $scope.sentimentVisitorsChartData = populate_graphChartData(response.data.results.related_queries_list.rising, true);

                  $scope.historyRegionInterestData = response.data.results.interest_over_region;
                  $scope.historyQuestionData = response.data.results.autocomplete;
                  console.log("QuestionData quest: ", $scope.historyQuestionData);

                  $scope.historyTweets = response.data.results.tweets.popular_tweets;
                  $scope.historyTweetsGender = response.data.results.tweets.tweet_gender_prob;
                  console.log("$scope.discoverTweetsGender", $scope.discoverTweetsGender );
                  if(typeof $scope.historyTweetsGender !== 'undefined' && typeof $scope.historyTweetsGender.male !== 'undefined') {
                      $scope.show_gender = true;
                      $scope.populate_pie($scope.historyTweetsGender.male ,$scope.historyTweetsGender.female,
                      $scope.historyTweetsGender.unknown, $scope.historyTweetsGender.total_records);
                  }
                  $scope.description = response.data.query_desc;

                  //sentiment
                  $scope.average_sentiment = response.data.results.tweets.twitter_sentiment_top_result;
                  $scope.populate_pie_sentiment($scope.average_sentiment.total_tweets_positive, $scope.average_sentiment.total_tweets_negative,
                      $scope.average_sentiment.total_tweets_neutral);
                  $scope.show_sentiment = true;


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

      $scope.getReport = function(queryId) {
          console.log("getReport ",queryId );
          var downloadPath = DJANGO_SERVICE_URL+'/history_export/'+queryId+'/';
          window.open(downloadPath, '_self', '');
      };

  }
})();