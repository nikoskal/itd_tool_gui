(function(){

    angular
        .module('app')
        .controller('DashboardController', dashboardController);

    dashboardController.$inject = ['authService'];

    function dashboardController(authService) {
        var vm = this;
        vm.auth = authService;
        console.log("isAuthenticated dbc", vm.auth.isAuthenticated());

    }

})();
