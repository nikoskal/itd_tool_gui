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
            // clientID: 'S1fLx52SDwQcS1Lt9esgsRZ16ucc1DTm',
            // domain: 'producer-account.eu.auth0.com',
            // responseType: 'token id_token',
            // // redirectUri: 'http://localhost:3000/#!/callback',
            // scope: 'openid',
            // clientSecret: '_mxPRQeVcUNE7xrQiELsIbHE5B-WIB_V64miDBUYrq31jAfHwiJXw3E6rp27_wkl'
            // domain: 'itdtool.eu.auth0.com',
            // clientID: 'JtvWDJ0GhxFjeQH5Unt4dfanGzIWip8j',
            // clientSecret: 'd8ZanNotEKgM9aVC-RwHOvlc7c-kdo9yoRD0QZRkc5tmvUDeGjzHSOG-vkVAJqDA',
            // responseType: 'token id_token',
            // redirectUri:'http://localhost:3000/#/callback'

            domain: AUTH0_DOMAIN,
            clientID: AUTH0_CLIENT_ID,
            // clientSecret: '_mxPRQeVcUNE7xrQiELsIbHE5B-WIB_V64miDBUYrq31jAfHwiJXw3E6rp27_wkl',
            responseType: 'token id_token',
            redirectUri: AUTH0_CALLBACK_URL

        });
        $urlRouterProvider.otherwise('/');

        $locationProvider.hashPrefix('');

        /// Comment out the line below to run the app
        // without HTML5 mode (will use hashes in routes)
        // $locationProvider.html5Mode(true);
    }



})();