/* global angular */
(function () {
    'use strict';
    angular
        .module('intelequiz')
        .controller('publicarQuizCtrl', publicarQuizCtrl);
    publicarQuizCtrl.$inject = ['DADOS', 'SERVICE', 'CLASSES', '$state', '$scope', '$timeout', 'ionicMaterialMotion', 'ionicDatePicker', '$filter'];
    function publicarQuizCtrl(DADOS, SERVICE, CLASSES, $state, $scope, $timeout, ionicMaterialMotion, ionicDatePicker, $filter) {
        var publicarQuizCtrl = this;

        init();

        function init() {
            publicarQuizCtrl.init = init;
            publicarQuizCtrl.usuarioLogado = DADOS.USUARIO_LOGADO;
            publicarQuizCtrl.arrayTurma = [];
            publicarQuizCtrl.quiz = $state.params.quiz;


            publicarQuizCtrl.selecionarData = selecionarData;
            publicarQuizCtrl.publicarQuiz = publicarQuiz;
            listTurmasByProfessorByDisciplina(publicarQuizCtrl.usuarioLogado, publicarQuizCtrl.quiz);

            $scope.$broadcast('scroll.refreshComplete');
        }

        function selecionarData() {
            var ipObj1 = {
                callback: function (val) {  //Mandatory
                    publicarQuizCtrl.tsEncerramento = val;
                },
                from: new Date(),           //Optional
                inputDate: new Date(),      //Optional
                closeOnSelect: true,        //Optional
                dateFormat: 'dd MMMM yyyy',
                templateType: 'popup'       //Optional
            };
            ionicDatePicker.openDatePicker(ipObj1);
        }

        function listTurmasByProfessorByDisciplina(professor, quiz) {
            if (professor && professor.matricula && quiz && quiz.disciplina && quiz.disciplina.id) {
                SERVICE.listTurmasByProfessorByDisciplina(publicarQuizCtrl.usuarioLogado.matricula, quiz.disciplina.id).then(function (response) {
                    if (response.data && response.data.length > 0) {
                        publicarQuizCtrl.arrayTurma = response.data;
                        publicarQuizCtrl.filtroTurma = publicarQuizCtrl.arrayTurma[0];
                    }
                });
            }
        }

        function publicarQuiz(turma) {
            var turmaQuiz = new CLASSES.TurmaQuiz();
            turmaQuiz.turma = turma;
            turmaQuiz.quiz = publicarQuizCtrl.quiz;
            turmaQuiz.tsEncerramento = publicarQuizCtrl.tsEncerramento;

            console.log(turmaQuiz);
            if (validarTurmaQuiz(turmaQuiz) || true) {
                SERVICE.publicarQuiz(turmaQuiz).then(function (response) {
                    if (response.message && response.message.type != "error") {
                        $state.go('menu.quiz');
                    }
                });
            }
        }

        function validarTurmaQuiz(turmaQuiz) {
            if (!turmaQuiz.turma || !turmaQuiz.turma.id) {
                var message = {
                    type: 'warning',
                    text: 'Selecione uma turma'
                };
                SERVICE.showToaster(message);
                return false;
            }
            if (!turmaQuiz.quiz || !turmaQuiz.quiz.id) {
                var message = {
                    type: 'warning',
                    text: 'Selecione um quiz'
                };
                SERVICE.showToaster(message);
                return false;
            }
            if (!turmaQuiz.tsEncerramento || turmaQuiz.tsEncerramento === "") {
                var message = {
                    type: 'warning',
                    text: 'Selecione uma data de encerramento'
                };
                SERVICE.showToaster(message);
                return false;
            }
            return true;
        }
    }
})();