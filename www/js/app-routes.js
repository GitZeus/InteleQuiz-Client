/* global angular */
(function () {
    'use strict';
    angular
            .module('intelequiz')
            .config(RouteConfig);
    RouteConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RouteConfig($stateProvider, $urlRouterProvider) {

        $stateProvider
                .state('login', {
                    url: '/login',
                    templateUrl: 'app/login/login.html',
                    controller: 'loginCtrl',
                    controllerAs: 'loginCtrl'
                })

                .state('menu', {
                    url: "/menu",
                    abstract: true,
                    templateUrl: "app/menu/menu.html"
                })

                .state('menu.home', {
                    url: '/home',
                    views: {
                        'conteudo': {
                            templateUrl: 'app/menu/home.html'
                        }
                    }
                })

        $urlRouterProvider.otherwise("/login");
    }
})();