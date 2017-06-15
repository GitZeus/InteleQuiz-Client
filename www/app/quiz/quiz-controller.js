/* global angular */
(function () {
    'use strict';
    angular
        .module('intelequiz')
        .controller('quizCtrl', quizCtrl);
    quizCtrl.$inject = ['DADOS', 'SERVICE', 'CLASSES', '$state', '$scope', '$timeout', 'ionicMaterialMotion'];
    function quizCtrl(DADOS, SERVICE, CLASSES, $state, $scope, $timeout, ionicMaterialMotion) {
        var quizCtrl = this;

        init();

        function init() {
            quizCtrl.init = init;
            quizCtrl.usuarioLogado = SERVICE.localStorageUtil.get('obj_usuario_logado');
            quizCtrl.arrayDisciplinas = [];
            quizCtrl.arrayQuiz = [];

            quizCtrl.listQuizByDisciplinaByProfessor = listQuizByDisciplinaByProfessor;

            listDisciplinaByProfessor(quizCtrl.usuarioLogado);
            $scope.$broadcast('scroll.refreshComplete');
        }

        function listDisciplinaByProfessor(professor) {
            quizCtrl.arrayDisciplinas = [];
            if (professor) {
                SERVICE.listDisciplinaByProfessor(professor.matricula).then(function (response) {
                    if (response.data) {
                        DADOS.DISCIPLINAS = response.data;
                        quizCtrl.arrayDisciplinas = DADOS.DISCIPLINAS;
                        quizCtrl.filtroDisciplina = quizCtrl.arrayDisciplinas[0] ? quizCtrl.arrayDisciplinas[0] : {};
                        listQuizByDisciplinaByProfessor(quizCtrl.filtroDisciplina);
                    }
                });
            }
        }

        function listQuizByDisciplinaByProfessor(disciplina) {
            quizCtrl.arrayQuiz = [];
            if (disciplina) {
                SERVICE.listQuizByDisciplinaByProfessor(quizCtrl.usuarioLogado.matricula, disciplina.id).then(function (response) {
                    if (response.data) {
                        DADOS.QUESTIONARIO = response.data;
                        quizCtrl.arrayQuiz = DADOS.QUESTIONARIO;
                        $timeout(function () {
                            ionicMaterialMotion.blinds({
                                startVelocity: 1000
                            });
                        });
                    }
                });
            }
        }
    }
})();