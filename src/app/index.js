'use strict';

angular.module('angularMaterialAdmin', ['ngAnimate', 'ngCookies',
    'ngSanitize', 'ui.router', 'ngMaterial', 'nvd3', 'app' , 'md.data.table'])

    .config(function ($stateProvider, $urlRouterProvider, $mdThemingProvider,
                      $mdIconProvider) {
        $stateProvider
            .state('home', {
                url: '',
                templateUrl: 'app/views/main.html',
                controller: 'MainController',
                controllerAs: 'vm',
                abstract: true
            })
            .state('home.dashboard', {
                url: '/dashboard',
                templateUrl: 'app/views/dashboard.html',
                controller: 'DashboardController',
                controllerAs: 'vm',
                data: {
                    title: 'Dashboard'
                }
            })
            .state('home.history', {
                url: '/history',
                templateUrl: 'app/views/history.html',
                controller: 'HistoryController',
                controllerAs: 'vm',
                data: {
                    title: 'HistoryController'
                }
            })
            .state('home.trends', {
                url: '/trends',
                templateUrl: 'app/views/trends.html',
                controller: 'TrendsController',
                controllerAs: 'vm',
                data: {
                    title: 'TrendsController'
                }
            })
            .state('home.queries', {
                url: '/queries',
                templateUrl: 'app/views/queries.html',
                controller: 'QueriesController',
                controllerAs: 'vm',
                data: {
                    title: 'QueriesController'
                }
            })
            .state('home.table', {
                url: '/table',
                controller: 'TableController',
                controllerAs: 'vm',
                templateUrl: 'app/views/table.html',
                data: {
                    title: 'Table'
                }
            })
            .state('home.data-table', {
                url: '/data-table',
                controller: 'DataTableController',
                controllerAs: 'vm',
                templateUrl: 'app/views/data-table.html',
                data: {
                    title: 'Table'
                }
            })
            .state('callback', {
                url: '/callback',
                controller: 'CallbackController',
                templateUrl: 'app/views/callback.html',
                controllerAs: 'vm'
            });

        $urlRouterProvider.otherwise('/dashboard');

        $mdThemingProvider
            .theme('default')
            .primaryPalette('grey', {
                'default': '600'
            })
            .accentPalette('teal', {
                'default': '500'
            })
            .warnPalette('defaultPrimary');

        $mdThemingProvider.theme('dark', 'default')
            .primaryPalette('defaultPrimary')
            .dark();

        $mdThemingProvider.theme('grey', 'default')
            .primaryPalette('grey');

        $mdThemingProvider.theme('custom', 'default')
            .primaryPalette('defaultPrimary', {
                'hue-1': '50'
            });

        $mdThemingProvider.definePalette('defaultPrimary', {
            '50':  '#FFFFFF',
            '100': 'rgb(255, 198, 197)',
            '200': '#E75753',
            '300': '#E75753',
            '400': '#E75753',
            '500': '#E75753',
            '600': '#E75753',
            '700': '#E75753',
            '800': '#E75753',
            '900': '#E75753',
            'A100': '#E75753',
            'A200': '#E75753',
            'A400': '#E75753',
            'A700': '#E75753'
        });

        $mdIconProvider.icon('user', 'assets/images/user.svg', 64);

    });
