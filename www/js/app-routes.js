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

                .state('menu.perfil', {
                    url: '/perfil',
                    views: {
                        'conteudo': {
                            templateUrl: 'app/perfil/perfil.html',
                            controller: 'PerfilCtrl',
                            controllerAs: 'ctrl'
                        }
                    }
                })

                .state('menu.home', {
                    url: '/home',
                    views: {
                        'conteudo': {
                            templateUrl: 'app/menu/home.html'
                        }
                    }
                })
                .state('menu.list-disciplina', {
                    url: "/list-disciplina",
                    views: {
                        'conteudo': {
                            templateUrl: 'app/disciplina/list-disciplina/list-disciplina.html',
                            controller: 'ListDisciplinaCtrl',
                            controllerAs: 'vm'
                        }
                    }
                })

                .state('menu.addDisciplina', {
                    url: '/disciplina',
                    views: {
                        'conteudo': {
                            templateUrl: 'app/disciplina/disciplina/disciplina.html',
                            controller: 'DisciplinaCtrl'
                        }
                    }
                })

                .state('menu.editDisciplina', {
                    url: "/disciplina/:indice",
                    views: {
                        'conteudo': {
                            templateUrl: "app/disciplina/disciplina/disciplina.html",
                            controller: "DisciplinaCtrl"
                        }
                    }
                })

                .state('menu.list-questao', {
                    url: "/list-questao",
                    views: {
                        'conteudo': {
                            templateUrl: 'app/questao/list-questao/list-questao.html',
                            controller: 'ListQuestaoCtrl',
                            controllerAs: 'vm'
                        }
                    }
                })

                .state('menu.addQuestao', {
                    url: '/questao',
                    views: {
                        'conteudo': {
                            templateUrl: 'app/questao/questao.html',
                            controller: 'QuestaoCtrl'
                        }
                    }
                })

                .state('menu.editQuestao', {
                    url: "/questao/:indice",
                    views: {
                        'conteudo': {
                            templateUrl: "app/questao/questao.html",
                            controller: "QuestaoCtrl"
                        }
                    }
                });

        $urlRouterProvider.otherwise("/login");
    }
})();