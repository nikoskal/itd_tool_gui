(function () {

    'use strict';

    angular
        .module('app')
        .service('authService', authService);

    authService.$inject = ['$state', 'angularAuth0', '$timeout', '$window', '$q'];

    function authService($state, angularAuth0, $timeout, $window,$q) {

        var userProfile;

        function setUserProfile(profile) {
            userProfile = profile;
            console.log("0 userProfile:");
        }

        function login() {
            console.log("1 inside login");
            angularAuth0.authorize();
        }

        // also calls the setSession
        function handleAuthentication() {
            console.log("2 inside handleAuthentication");
            angularAuth0.parseHash(function(err, authResult) {

                if (authResult && authResult.accessToken && authResult.idToken) {
                    console.log("2a !!inside accessToken", authResult.accessToken);
                    console.log("2b !!inside id_token", authResult.idToken);
                    console.log("2c !!inside expires", authResult.expiresIn);
                    console.log("2d !!inside sub", authResult.idTokenPayload.sub);

                    console.log("2f !!inside name", authResult.idTokenPayload.name);
                    console.log("2e !!inside all", authResult);
                    // console.log("5 !!inside sub", authResult.idTokenPayload.sub);

                    setSession(authResult);
                    // $state.go('home.dashboard');
                } else if (err) {
                    console.log('2our error in handle auth 2'+ err.description);
                }
            });
        }

        // function checkSession() {
        //     angularAuth0.checkSession({
        //         audience: AUTH0_AUDIENCE,
        //         scope: 'openid profile',
        //         redirectUri: AUTH0_CALLBACK_URL,
        //         responseType: 'token id_token'
        //     }, function (err, authResult) {
        //         console.log(" checkSession");
        //         if (err) {
        //             console.log('Could not get a new token. ' + err.description);
        //             $window.location.href = 'http://producer-toolkit.eu/';
        //         } else {
        //             setSession(result);
        //             console.log('Successfully renewed auth!');
        //         }
        //     });
        // }


        function setSession(authResult) {
            // Set the time that the access token will expire at
            console.log("4 inside setSession");
            var expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
            localStorage.setItem('access_token', authResult.accessToken);
            localStorage.setItem('id_token', authResult.idToken);
            localStorage.setItem('expires_at', expiresAt);
            localStorage.setItem('sub', authResult.idTokenPayload.sub);
            // localStorage.setItem('auth0_profile', JSON.stringify(user));
        }


        function getProfile(cb) {
            console.log("5 inside getProfile");
            var accessToken = localStorage.getItem('access_token');
            if (!accessToken) {
                throw new Error('Access token must exist to fetch profile');
            }
            angularAuth0.client.userInfo(accessToken, function(err, profile) {
                if (profile) {
                    setUserProfile(profile);
                }
                cb(err, profile);
            });
        }

        // how to logout from the cetralised tool
        function logout() {
            // Remove tokens and expiry time from localStorage
            console.log("6 Log out!");
            localStorage.removeItem('access_token');
            localStorage.removeItem('id_token');
            localStorage.removeItem('expires_at');
            localStorage.removeItem('sub');

            angularAuth0.logout({
                returnTo: AUTH0_RETURN_TO,
                client_id: AUTH0_CLIENT_ID
            });
            // https://producer-account.eu.auth0.com/v2/logout?returnTo=http%3A%2F%2Fproducer-toolkit.eu&client_id=S1fLx52SDwQcS1Lt9esgsRZ16ucc1DTm
            // $window.location.href = 'https://producer-account.eu.auth0.com/v2/logout?returnTo=http%3A%2F%2Fproducer-toolkit.eu&client_id=S1fLx52SDwQcS1Lt9esgsRZ16ucc1DTm';

        }

        function renewToken() {
            console.log("2 inside renewToken");
            angularAuth0.checkSession({
                    audience: AUTH0_AUDIENCE,
                    scope: 'openid profile',
                    redirectUri: AUTH0_CALLBACK_URL,
                    responseType: 'token id_token'
                }, function (err, authResult) {
                    console.log("checkSession!!!!!");
                    if (authResult && authResult.accessToken && authResult.idToken) {
                      console.log("2a !!inside accessToken", authResult.accessToken);
                        console.log("2b !!inside id_token", authResult.idToken);
                        console.log("2c !!inside expires", authResult.expiresIn);
                        console.log("2d !!inside sub", authResult.idTokenPayload.sub);

                        console.log("2f !!inside name", authResult.idTokenPayload.name);
                        console.log("2e !!inside all", authResult);
                        // console.log("5 !!inside sub", authResult.idTokenPayload.sub);

                        setSession(authResult);
                        // $state.go('home.dashboard');
                    } else if (err) {
                        console.log("renewToken: error in handle auth 1");
                        // $state.go('home.dashboard');
                        // $window.location.href = 'http://producer-toolkit.eu/';
                        console.log('renewToken:  error in handle auth 2');
                }
                console.log("checkSession!!!!! ????");
                }
            );
        }


        function isAuthenticated() {
            // console.log("i= ?", i++);
            var expiresAt = JSON.parse(localStorage.getItem('expires_at'));
            var authenticated = new Date().getTime() < expiresAt;
            // console.log("auth.service: isAuthenticated ?", authenticated);
            return authenticated;
        }

        // function checkSessionLogoutFromOtherTool() {
        //     console.log("auth.service: checkSessionLogoutFromOtherTool");
        //     var deferred = $q.defer();
        //
        //     angularAuth0.checkSession({
        //         audience: AUTH0_AUDIENCE,
        //         scope: 'openid profile',
        //         redirectUri: 'http://itd.producer-toolkit.eu/complete/auth0',
        //         responseType: 'token id_token',
        //     }, function (err, authResult) {
        //         if (authResult && authResult.accessToken && authResult.idToken) {
        //             console.log("auth.service: checkSessionLogoutFromOtherTool: true");
        //             deferred.resolve(true);
        //         } else if (err) {
        //             console.log("auth.service: checkSessionLogoutFromOtherTool: false"+ err.description);
        //             deferred.resolve(false);
        //             // logout();
        //         }
        //     });
        //
        //     return deferred.promise;
        // }



        function checkSessionLogoutFromOtherTool() {
            console.log("2 inside handleAuthentication");
            angularAuth0.checkSession({
                        audience: AUTH0_AUDIENCE,
                        scope: 'openid profile',
                        redirectUri: 'http://itd.producer-toolkit.eu/complete/auth0',
                        responseType: 'token id_token'
                    },
                function(err, authResult) {

                if (authResult && authResult.accessToken && authResult.idToken) {
                    console.log("2a !!inside accessToken", authResult.accessToken);
                    console.log("2b !!inside id_token", authResult.idToken);
                    console.log("2c !!inside expires", authResult.expiresIn);
                    console.log("2d !!inside sub", authResult.idTokenPayload.sub);

                    console.log("2f !!inside name", authResult.idTokenPayload.name);
                    console.log("2e !!inside all", authResult);
                    // console.log("5 !!inside sub", authResult.idTokenPayload.sub);


                    // $state.go('home.dashboard');
                } else if (err) {
                    console.log('2our error in handle auth 2'+ err.description);
                }
            });
        }

        return {
            login: login,
            handleAuthentication: handleAuthentication,
            getProfile: getProfile,
            logout: logout,
            isAuthenticated: isAuthenticated,
            renewToken: renewToken,
            checkSessionLogoutFromOtherTool : checkSessionLogoutFromOtherTool
        };
    }
})();