(function(){

    angular
        .module('app')
        .controller('QueriesController', [
            '$http','$scope','$location',
            QueriesController
        ]);




    function QueriesController($http, $scope, $location) {
        var vm = this;
        vm.queriesData  =[];
        vm.postQuery = postNewQuery;
        $scope.isLoading =  false;


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
            category:""
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
                category:""
            };
        }



        $scope.getCategoryName = function(catid){

            // console.log("find  getCategoryName",  catid);
            for(var i = 0; i <  $scope.categories.length; i++){
                // console.log("inside getCategoryName",  $scope.categories[i].id)

                if($scope.categories[i].id === catid) {
                    // console.log("found",  $scope.categories[i].name);
                    return $scope.categories[i].name;
                }
            }
        }




        function retrieveAllQueries() {

            // $http.get('http://147.102.22.76:8000/query-parameters/').then(function (response) {
            $http.get('http://127.0.0.1:8000/query-parameters/').then(function (response) {
                vm.queriesData = response.data;
                // console.log("inside vm.queriesData",  vm.queriesData);
                // console.log("inside vm.queriesData",  vm.queriesData[0].category);
                for(var i = 0; i <  vm.queriesData.length; i++){
                    // console.log("inside getCategoryName",  $scope.categories[i].id)
                    var catName = $scope.getCategoryName(vm.queriesData[i].category);
                    vm.queriesData[i].category = catName;
                }
            });
            reset_data();
        }
        retrieveAllQueries()


        function postNewQuery() {
            console.log("inside new query",  vm.newquery);

            var config = {
                headers : {
                    'Content-Type': 'application/json'
                }
            };

            // $http.post('http://147.102.22.76:8000/query-parameters/', vm.newquery, config)
            $http.post('http://127.0.0.1:8000/query-parameters/', vm.newquery, config)
                .then(function successCallback(response) {
                    console.log("inside success post response", response );
                }, function errorCallback(response) {
                    console.log("inside error post response", response );
                });
            retrieveAllQueries();
        }


        $scope.deleteQuery = function(queryId){
            console.log("delete",  queryId);

            var config = {
                headers : {
                    'Content-Type': 'application/json'
                }
            };

            // var myurl = 'http://147.102.22.76:8000/query-parameters/'+queryId;
            var myurl = 'http://127.0.0.1:8000/query-parameters/'+queryId;

            console.log("inside delete",  myurl);

            $http({
                method: 'DELETE',
                url: myurl
            }).then(function successCallback(response) {
                console.log("inside success delete response", response );

            }, function errorCallback(response) {
                console.log("inside error delete response", response );
            });
            console.log("delete  retrieveAllQueries");
            retrieveAllQueries();
        };



        $scope.gettopics= function(keyword){
            console.log("gettopics",  keyword);
            $scope.isLoading = true;
            vm.topics = {};
            $http.get('http://127.0.0.1:8000/gtrends-keyword-topic/'+keyword).then(function (response) {
                vm.topics = response.data;
                var none = {
                    type: 'none',
                    title: 'none',
                    mid: 'none',
                }
                vm.topics.push(none)
                vm.topics.type =
                $scope.isLoading = false;
                console.log("vm.deactivated = false;",  $scope.isLoading);
            });
            vm.activated = false;
        };


        // $scope.discover = function(queryId) {
        //
        //     console.log("inside discover redirect",  queryId);
        //     $location.url('http://localhost:3000/#!/skata');
        //
        // };
        // $scope.discover = function(queryId) {
        //
        //     console.log("inside discover",  queryId);
        //
        //     // var config = {
        //     //     headers : {
        //     //         'Content-Type': 'application/json'
        //     //     }
        //     // };
        //
        //     // $http.post('http://147.102.22.76:8000/query-parameters/', vm.newquery, config)
        //     $http.get('http://127.0.0.1:8000/discover/'+queryId)
        //         .then(function successCallback(response) {
        //             console.log("inside success discover response", response );
        //         }, function errorCallback(response) {
        //             console.log("inside error discover response", response );
        //         });
        //
        //     // $http.get('http://127.0.0.1:8000/discover/'+queryId).then(function (response) {
        //     //     vm.discoverData = response.data;
        //     // });
        //
        //
        // };






    }
})();