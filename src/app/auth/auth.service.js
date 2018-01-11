(function () {

    'use strict';

    angular
        .module('app')
        .service('authService', authService);

    authService.$inject = ['$state', 'angularAuth0', '$timeout'];

    function authService($state, angularAuth0, $timeout) {

        function login() {
            // console.log("0 !!inside login");
            angularAuth0.authorize();
        }

        function handleAuthentication() {
            // console.log("1 !!inside handleAuthentication");
            angularAuth0.parseHash(function(err, authResult) {
                if (authResult && authResult.accessToken && authResult.idToken) {
                    console.log("2 !!inside handleAuthentication", authResult.accessToken);
                    setSession(authResult);
                    $state.go('home');
                } else if (err) {
                    $timeout(function() {
                        $state.go('dashboard');
                    });
                    console.log(err);
                    // alert('Error: ' + err.error + '. Check the console for further details.');
                }
            });
        }

        function setSession(authResult) {
            // Set the time that the access token will expire at
            var expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
            localStorage.setItem('access_token', authResult.accessToken);
            localStorage.setItem('id_token', authResult.idToken);
            localStorage.setItem('expires_at', expiresAt);
            // console.log("@@setting session", authResult.accessToken);
        }

        function logout() {
            // Remove tokens and expiry time from localStorage
            localStorage.removeItem('access_token');
            localStorage.removeItem('id_token');
            localStorage.removeItem('expires_at');
            $state.go('home');
        }

        function isAuthenticated() {
            // Check whether the current time is past the
            // access token's expiry time
            // console.log("##accessToken auth service", localStorage.getItem('access_token'));
            // console.log("##expires_at auth service", localStorage.getItem('expires_at'));
            var expiresAt = JSON.parse(localStorage.getItem('expires_at'));
            return new Date().getTime() < expiresAt;
        }

        return {
            login: login,
            handleAuthentication: handleAuthentication,
            logout: logout,
            isAuthenticated: isAuthenticated
        };
    }
})();
