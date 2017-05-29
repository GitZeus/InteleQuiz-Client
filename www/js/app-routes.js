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
                    publicacao: null,
                    novoTreino: null
                },
                views: {
                    'conteudo': {
                        templateUrl: 'app/treino/manter-treino.html',
                        controller: 'manterTreinoCtrl',
                        controllerAs: 'manterTreinoCtrl'
                    }
                }
            })

            .state('menu.ranking-turma', {
                url: '/ranking-turma',
                cache: false,
                views: {
                    'conteudo': {
                        templateUrl: 'app/ranking/ranking-turma.html',
                        controller: 'rankingTurmaCtrl',
                        controllerAs: 'rankingTurmaCtrl'
                    }
                }
            })

            .state('menu.ranking-aluno', {
                url: '/ranking-aluno',
                cache: false,
                params: {
                    turma: null
                },
                views: {
                    'conteudo': {
                        templateUrl: 'app/ranking/ranking-aluno.html',
                        controller: 'rankingAlunoCtrl',
                        controllerAs: 'rankingAlunoCtrl'
                    }
                }
            })

            .state('menu.desempenho', {
                url: '/desempenho',
                cache: false,
                views: {
                    'conteudo': {
                        templateUrl: 'app/desempenho/desempenho.html',
                        controller: 'desempenhoCtrl',
                        controllerAs: 'desempenhoCtrl'
                    }
                }
            })

        $urlRouterProvider.otherwise("/login");
    }
})();