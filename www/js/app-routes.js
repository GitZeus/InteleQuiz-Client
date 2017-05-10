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

            .state('menu.tema', {
                url: '/tema',
                cache: false,
                views: {
                    'conteudo': {
                        templateUrl: 'app/tema/tema.html',
                        controller: 'temaCtrl',
                        controllerAs: 'temaCtrl'
                    }
                }
            })

            .state('menu.questao', {
                url: '/questao',
                cache: false,
                views: {
                    'conteudo': {
                        templateUrl: 'app/questao/questao.html',
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
                params: {
                    quiz: null
                },
                views: {
                    'conteudo': {
                        templateUrl: 'app/quiz/manter-quiz.html',
                        controller: 'manterQuizCtrl',
                        controllerAs: 'manterQuizCtrl'
                    }
                }
            })

            .state('menu.publicar-quiz', {
                url: '/publicar-quiz',
                cache: false,
                params: {
                    quiz: null
                },
                views: {
                    'conteudo': {
                        templateUrl: 'app/quiz/publicar-quiz.html',
                        controller: 'publicarQuizCtrl',
                        controllerAs: 'publicarQuizCtrl'
                    }
                }
            })

            .state('menu.treino', {
                url: '/treino',
                cache: false,
                views: {
                    'conteudo': {
                        templateUrl: 'app/treino/treino.html',
                        controller: 'treinoCtrl',
                        controllerAs: 'treinoCtrl'
                    }
                }
            })

            .state('menu.realizar-treino', {
                url: '/manter-treino',
                cache: false,
                params: {
                    turmaQuiz: null
                },
                views: {
                    'conteudo': {
                        templateUrl: 'app/treino/manter-treino.html',
                        controller: 'manterTreinoCtrl',
                        controllerAs: 'manterTreinoCtrl'
                    }
                }
            })

        $urlRouterProvider.otherwise("/login");
    }
})();