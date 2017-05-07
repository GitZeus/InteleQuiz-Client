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
            quizCtrl.usuarioLogado = DADOS.USUARIO_LOGADO;
            quizCtrl.arrayDisciplinas = [];
            quizCtrl.arrayQuiz = [];

            quizCtrl.listQuizByDisciplina = listQuizByDisciplina;

            listDisciplinasByProfessor(quizCtrl.usuarioLogado);
            $scope.$broadcast('scroll.refreshComplete');
        }

        function listDisciplinasByProfessor(professor) {
            quizCtrl.arrayDisciplinas = [];
            if (professor) {
                SERVICE.listDisciplinasByProfessor(professor).then(function (response) {
                    if (response.data) {
                        DADOS.DISCIPLINAS = response.data;
                        quizCtrl.arrayDisciplinas = DADOS.DISCIPLINAS;
                        quizCtrl.filtroDisciplina = quizCtrl.arrayDisciplinas[0] ? quizCtrl.arrayDisciplinas[0] : {};
                        listQuizByDisciplina(quizCtrl.filtroDisciplina);
                    }
                });
            }
        }

        function listQuizByDisciplina(disciplina) {
            quizCtrl.arrayQuiz = [];
            if (disciplina) {
                SERVICE.listQuizByDisciplina(quizCtrl.usuarioLogado.matricula, disciplina.id).then(function (response) {
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