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
                    cache: false,
                    templateUrl: 'app/login/login.html',
                    controller: 'loginCtrl',
                    controllerAs: 'loginCtrl'
                })

                .state('menu', {
                    url: "/menu",
                    abstract: true,
                    cache: false,
                    templateUrl: "app/menu/menu.html",
                    controller: 'menuCtrl',
                    controllerAs: 'menuCtrl'
                })

                .state('menu.home', {
                    url: '/home',
                    views: {
                        'conteudo': {
                            templateUrl: 'app/menu/home.html'
                        }
                    }
                })

                .state('menu.temas', {
                    url: '/temas',
                    cache: false,
                    views: {
                        'conteudo': {
                            templateUrl: 'app/tema/temas.html',
                            controller: 'temaCtrl',
                            controllerAs: 'temaCtrl'
                        }
                    }
                })

                .state('menu.questoes', {
                    url: '/questoes',
                    cache: false,
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
                    cache: false,
                    params: {
                        questao: null
                    },
                    views: {
                        'conteudo': {
                            templateUrl: 'app/questao/manter-questao.html',
                            controller: 'manterQuestaoCtrl',
                            controllerAs: 'manterQuestaoCtrl'
                        }
                    }
                })

                .state('menu.quiz', {
                    url: '/quiz',
                    cache: false,
                    views: {
                        'conteudo': {
                            templateUrl: 'app/quiz/quiz.html',
                            controller: 'quizCtrl',
                            controllerAs: 'quizCtrl'
                        }
                    }
                })

                .state('menu.manter-quiz', {
                    url: '/manter-quiz',
                    cache: false,
                    views: {
                        'conteudo': {
                            templateUrl: 'app/quiz/manter-quiz.html',
                            controller: 'manterQuizCtrl',
                            controllerAs: 'manterQuizCtrl'
                        }
                    }
                })

        $urlRouterProvider.otherwise("/login");
    }
})();