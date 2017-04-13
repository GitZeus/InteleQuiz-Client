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
                    templateUrl: "app/menu/menu.html",
                    controller: 'menuCtrl',
                    controllerAs: 'menuCtrl',
                    cache: false
                })

                .state('menu.home', {
                    url: '/home',
                    views: {
                        'conteudo': {
                            templateUrl: 'app/menu/home.html'
                        }
                    }
                })
                
                .state('menu.questoes', {
                    url: '/questoes',
                    views: {
                        'conteudo': {
                            templateUrl: 'app/questao/questoes.html',
                            controller: 'questaoCtrl',
                            controllerAs: 'questaoCtrl'
                        }
                    }
                })
                .state('menu.manter-questao', {
                    url: '/manter-questao',
                    views: {
                        'conteudo': {
                            templateUrl: 'app/questao/manter-questao.html',
                            controller: 'manterQuestaoCtrl',
                            controllerAs: 'manterQuestaoCtrl'
                        }
                    }
                })

        $urlRouterProvider.otherwise("/login");
    }
})();