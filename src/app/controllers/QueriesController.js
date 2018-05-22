(function(){

    angular
        .module('app')
        .controller('QueriesController', [
            '$http','$scope','$location', '$anchorScroll','authService',
            QueriesController
        ]);


    QueriesController.$inject = ['authService'];

    function QueriesController($http, $scope, $location, $anchorScroll, authService) {
        var vm = this;
        vm.queriesData  =[];
        vm.postQuery = postNewQuery;
        $scope.isLoading =  false;
        vm.topics = {};
        vm.clicktoopen = {};
        vm.clicktoopenAbt = {};
        $scope.isLoading =  false;
        $scope.isCompleted =  false;
        $scope.isCompletedError = false;
        vm.auth = authService;

        console.log("QueriesController 1:renewToken");
        vm.auth.renewToken();
        console.log("QueriesController 2:renewToken");

        $scope.categories = [
            {name:"All categories",
                id: 0},
            {name:"Arts & Entertainment",
                id: 3},
            {name:"Celebrities & Entertainment News",
                id: 184},
            {name:"Entertainment Industry",
                id: 612 },
            {name:"Events & Listings",
                id: 569 },
            {name:"Fun & Trivia",
                id: 539 },
            {name:"Humor",
                id: 182 },
            {name:"Movies",
                id: 34 },
            {name:"Music & Audio",
                id: 35 },
            {name:"Online Media",
                id: 613 },
            {name:"Performing Arts",
                id: 23 },
            {name:"TV & Video",
                id: 36 },
            {name:"Autos & Vehicles",
                id: 47 },
            {name:"Beauty & Fitness",
                id: 44 },
            {name:"Books & Literature",
                id: 22 },
            {name:"Business & Industrial",
                id: 12 },
            {name:"Computers & Electronics",
                id: 5 },
            {name:"Finance",
                id: 7 },
            {name:"Food & Drink",
                id: 71 },
            {name:"Games",
                id: 8 },
            {name:"Health",
                id: 45 },
            {name:"Hobbies & Leisure",
                id: 65 },
            {name:"Home & Garden",
                id: 11 },
            {name:"Internet & Telecom",
                id: 13 },
            {name:"Jobs & Education",
                id: 958},
            {name:"Law & Government",
                id: 19 },
            {name:"News",
                id: 16 },
            {name:"Online Communities",
                id: 299 },
            {name:"People & Society",
                id: 14 },
            {name:"Pets & Animals",
                id: 66 },
            {name:"Real Estate",
                id: 29 },
            {name:"Science",
                id: 174 },
            {name:"Shopping",
                id: 18 },
            {name:"Sports",
                id: 20 },
            {name:"Travel",
                id: 67}
        ];



        // vm.deleteQueryId = "";
        // vm.deleteQuery = deleteQuery()

        vm.newquery = {
            description:"",
            keywords:"",
            start_date:"",
            end_date: "",
            id: "",
            inference: "",
            location: "",
            questions: "",
            twitter: "",
            google:"",
            youtube:"",
            topic:"",
            category:"",
            authid:""
        };


        function reset_data() {
            vm.newquery = {
                description:"",
                keywords:"",
                start_date:"",
                end_date: "",
                id: "",
                inference: "",
                location: "",
                questions: "",
                twitter: "",
                google:"",
                youtube:"",
                topic:"",
                category:"",
                authid:""
            };
            vm.topics = {};
            vm.clicktoopen = {};
            vm.clicktoopenABT = {};
        }



        $scope.clearusermsg = function() {
            $scope.isLoading =  false;
            $scope.isCompleted =  false;
            $scope.isCompletedError = false;
            $scope.keyword = {};
            $scope.description = {};
            $scope.call_duration = {};

        };

        $scope.getCategoryName = function(catid){

            // console.log("find  getCategoryName",  catid);
            for(var i = 0; i <  $scope.categories.length; i++){
                // console.log("inside getCategoryName",  $scope.categories[i].id)

                if($scope.categories[i].id === catid) {
                    // console.log("found",  $scope.categories[i].name);
                    return $scope.categories[i].name;
                }
            }
        };

        $scope.reloadRoute = function() {

            // console.log("calling  reload " );
            // $route.reload();
            window.location.reload(true);
        };


        // function retrieveAllQueries() {
        //
        //     $http.get(DJANGO_SERVICE_URL+'/query-parameters/').then(function (response) {
        //         vm.queriesData = response.data;
        //         // console.log("inside vm.queriesData",  vm.queriesData);
        //         // console.log("inside vm.queriesData",  vm.queriesData[0].category);
        //         for(var i = 0; i <  vm.queriesData.length; i++){
        //             // console.log("inside getCategoryName",  $scope.categories[i].id)
        //             var catName = $scope.getCategoryName(vm.queriesData[i].category);
        //             vm.queriesData[i].category = catName;
        //         }
        //     });
        //     reset_data();
        // }
        // retrieveAllQueries();

        function retrieveAllQueries_authid() {

            var authid = localStorage.getItem('sub');
            authid = authid.substring(6, authid.length);
            console.log("authid--->", authid);

            $http.get(DJANGO_SERVICE_URL+'/query_parameters_authid/'+authid).then(function (response) {
                vm.queriesData = response.data;

                for(var i = 0; i <  vm.queriesData.length; i++){
                    // console.log("inside getCategoryName",  $scope.categories[i].id)
                    var catName = $scope.getCategoryName(vm.queriesData[i].category);
                    vm.queriesData[i].category = catName;
                }
            });
            reset_data();
        }
        retrieveAllQueries_authid();








        function postNewQuery() {
            console.log("inside new query",  vm.newquery);

            var config = {
                headers : {
                    'Content-Type': 'application/json'
                }
            };
            // var authid = localStorage.getItem('sub')

            var authid = localStorage.getItem('sub');
            authid = authid.substring(6, authid.length);

            console.log("authid--->", authid);


            vm.newquery.authid = authid;

            console.log("vm.newquery post data:", vm.newquery );
            // $http.post('http://147.102.22.76:8000/query-parameters/', vm.newquery, config)
            $http.post(DJANGO_SERVICE_URL+'/query-parameters/', vm.newquery, config)
                .then(function successCallback(response) {
                    console.log("inside success post response", response );
                    // retrieveAllQueries();
                    $scope.reloadRoute();
                }, function errorCallback(response) {
                    console.log("inside error post response", response );
                    // retrieveAllQueries();
                    $scope.reloadRoute();
                });

        }


        $scope.deleteQuery = function(queryId){
            console.log("delete",  queryId);

            var config = {
                headers : {
                    'Content-Type': 'application/json'
                }
            };

            // var myurl = 'http://147.102.22.76:8000/query-parameters/'+queryId;
            var myurl = DJANGO_SERVICE_URL+'/query-parameters/'+queryId+'/';

            console.log("inside delete",  myurl);

            $http({
                method: 'DELETE',
                url: myurl
            }).then(function successCallback(response) {
                console.log("inside success delete response", response );
                $scope.reloadRoute();
            }, function errorCallback(response) {
                console.log("inside error delete response", response );
                $scope.reloadRoute();
            });
            console.log("delete  retrieveAllQueries");
        };


        $scope.gettopics= function(keyword){
            console.log("gettopics",  keyword);
            vm.clicktoopen = {};
            $scope.isLoading = true;
            // if keyword contains spaces change them with _

            vm.topics = {};
            var myurl = DJANGO_SERVICE_URL+'/gtrends-keyword-topic/'+keyword+'/';
            console.log("myurl",  myurl);
            $http.get(myurl).then(function (response) {
                console.log("gettopics", response);
                vm.topics = response.data;
                var none = {
                    type: 'none',
                    title: 'none',
                    mid: 'none',
                };
                vm.topics.push(none);
                $scope.isLoading = false;
                // console.log("vm.deactivated = false;", $scope.isLoading);
                vm.clicktoopen = "click to select a topic";
            }, function errorCallback(response) {
                console.log("inside error gettopics, response:", response );
            });
            vm.activated = false;
        };





        $scope.getcampaigns= function() {
            console.log("getcampaigns start");
            vm.clicktoopenABT = {};
            // $scope.isLoading = true;
            // if keyword contains spaces change them with _

            vm.campaignsList = [];


            // betty: auth0|5a0d62ce9f01136123aed968
            // nikosk: auth0|5a27f35653673e543b454fb0
            // var myurl = 'http://ec2-34-241-230-92.eu-west-1.compute.amazonaws.com:8888/api/jsonws/producer-portlet.producer/get-all-campaigns-by-auth-id/auth-id/auth0|5a0d62ce9f01136123aed968';
            var myurl = 'http://ec2-34-241-230-92.eu-west-1.compute.amazonaws.com:8888/api/jsonws/producer-portlet.producer/get-all-campaigns-by-auth-id/auth-id/'+ localStorage.getItem('sub');

            console.log("myurl", myurl);

            $http({
                method: 'GET',
                // url: 'http://ec2-34-241-230-92.eu-west-1.compute.amazonaws.com:8888/api/jsonws/producer-portlet.producer/get-all-campaigns-by-auth-id/auth-id/auth0|5a0d62ce9f01136123aed968',
                url: myurl,
                headers: {
                    'Authorization': 'Basic QWRtaW5pc3RyYXRvcjpBZG1pbmlzdHJhdG9y'
                }
            }).then(function successCallback(response) {
                console.log("getcampaigns", response);
                var campLs = response;
                console.log("campLs", campLs);
                vm.clicktoopenABT = "click to select an ABT campaing";
                for (var i = 0; i < campLs.data.length; i++) {
                    var onecampaign = campLs.data[i];
                    console.log("one campaign desc", onecampaign.campaign_description);
                    vm.campaignsList.push(onecampaign.campaign_description);
                }
                console.log("all campaign desc list", vm.campaignsList);

                }, function errorCallback(response) {
                console.log("inside error getcampaigns, response:", response);
            });
        };


        $scope.discover = function(queryId, keyword, description) {

            $scope.clearusermsg();
            console.log("inside discover",  queryId);
            // $scope.clearalldata();
            $scope.isLoading = true;
            $scope.keyword = keyword;
            $scope.description = description;

            $location.hash('top');
            $anchorScroll();
            // $scope.show_gender = false;
            $http.get(DJANGO_SERVICE_URL+'/discover/'+queryId)
                .then(function successCallback(response) {
                    // $scope.isLoading = false;
                    $scope.isLoading = false;
                    $scope.isCompleted = true;
                    console.log("inside success discover response", response );
                    $scope.call_duration = response.data.time +" sec";
                }, function errorCallback(response) {
                    console.log("inside error discover response", response );
                    $scope.isLoading = false;
                    $scope.isCompletedError = true;
                });
        };
    }
})();