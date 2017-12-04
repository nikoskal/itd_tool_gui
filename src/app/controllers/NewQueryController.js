(function(){

    angular
        .module('app')
        .controller('NewQueryController', [
            '$http','$scope',
            NewQueryController
        ]);




    function NewQueryController($http, $scope) {
        var nqc = this;

        nqc.newquery = {
            description:"",
            start_date:"",
            end_date: "",
            id: "",
            inference: "",
            location: "",
            questions: "",
            sources: ""
        };

        console.log("this is newquery",  vm.newquery);


        function postit(inputdata) {
            console.log("inside postit",  inputdata);

            // var config = {
            //     headers : {
            //         'Content-Type': 'application/json'
            //     }
            // };
            // $http.post('http://147.102.22.76:8000/query-parameters/', inputdata, config)
            //     .success(function (data, status, headers, config) {
            //         $scope.PostDataResponse = data;
            //         console.log("inside success post response", data );
            //     })
            //     .error(function (data, status, header, config) {
            //         console.log("inside error post response", data );
            //         $scope.ResponseDetails = "Data: " + data +
            //             "<hr />status: " + status +
            //             "<hr />headers: " + header +
            //             "<hr />config: " + config;
            //
            //     });

        }

        // vm.mysubmit = postit(vm.newquery);
        console.log("inside submit",  vm.newquery);
    }
})();