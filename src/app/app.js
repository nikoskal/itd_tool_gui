// (function(){
//     'use strict';
//
//     angular.module('app', [ 'ngMaterial' ]);
//
// })();
(function () {

    'use strict';

    angular
        .module('app', ['auth0.auth0', 'ui.router'])
        .config(config);

    config.$inject = [
        '$stateProvider',
        '$locationProvider',
        '$urlRouterProvider',
        'angularAuth0Provider'
    ];

    function config(
        $stateProvider,
        $locationProvider,
        $urlRouterProvider,
        angularAuth0Provider
    ) {
        angularAuth0Provider.init({

            domain: AUTH0_DOMAIN,
            clientID: AUTH0_CLIENT_ID,
            responseType: 'token id_token',
            redirectUri: AUTH0_CALLBACK_URL,
            scope: 'openid profile'

        });
        $urlRouterProvider.otherwise('/');

        $locationProvider.hashPrefix('');

        /// Comment out the line below to run the app
        // without HTML5 mode (will use hashes in routes)
        // $locationProvider.html5Mode(true);
    }



})();