/* global angular */
(function () {
    'use strict';
    angular
        .module('intelequiz')
        .controller('publicarQuizCtrl', publicarQuizCtrl);
    publicarQuizCtrl.$inject = ['DADOS', 'UTIL', 'SERVICE', 'CLASSES', '$state', '$scope', '$timeout', 'ionicMaterialMotion'];
    function publicarQuizCtrl(DADOS, UTIL, SERVICE, CLASSES, $state, $scope, $timeout, ionicMaterialMotion) {
        var publicarQuizCtrl = this;

        init();

        function init() {
            publicarQuizCtrl.init = init;
            publicarQuizCtrl.usuarioLogado = UTIL.localStorage.get('obj_usuario_logado');
            publicarQuizCtrl.arrayTurma = [];
            publicarQuizCtrl.arrayQuizPublicado = [];
            publicarQuizCtrl.quiz = $state.params.quiz;

            publicarQuizCtrl.savePublicacao = savePublicacao;
            configDatepicker();
            listTurmaByProfessorByDisciplina(publicarQuizCtrl.usuarioLogado, publicarQuizCtrl.quiz);

            $scope.$broadcast('scroll.refreshComplete');
        }

        function listTurmaByProfessorByDisciplina(professor, quiz) {
            if (professor && professor.matricula && quiz && quiz.disciplina && quiz.disciplina.id) {
                SERVICE.listTurmaByProfessorByDisciplina(publicarQuizCtrl.usuarioLogado.matricula, quiz.disciplina.id).then(function (response) {
                    if (response.data && response.data.length > 0) {
                        publicarQuizCtrl.arrayTurma = response.data;
                        publicarQuizCtrl.filtroTurma = publicarQuizCtrl.arrayTurma[0];
                        listPublicacaoByStatusByTurma(publicarQuizCtrl.filtroTurma);
                    }
                });
            }
        }

        function listPublicacaoByStatusByTurma(turma) {
            if (turma && turma.id) {
                SERVICE.listPublicacaoByStatusByTurma(turma.id, 'Publicado').then(function(response){
                    if(response && response.data){
                        publicarQuizCtrl.arrayQuizPublicado = response.data;
                        $timeout(function () {
                            ionicMaterialMotion.blinds({
                                startVelocity: 1000
                            });
                        });
                    }
                });
            }
        }

        function savePublicacao(turma) {
            var publicacao = new CLASSES.Publicacao();
            publicacao.turma = turma;
            publicacao.quiz = publicarQuizCtrl.quiz;
            publicacao.tsEncerramento = publicarQuizCtrl.tsEncerramento;

            if (validarTurmaQuiz(publicacao)) {
                SERVICE.savePublicacao(publicacao).then(function (response) {
                    if (response.message && response.message.type == "success") {
                        $state.go('menu.quiz');
                    }
                });
            }
        }

        function validarTurmaQuiz(publicacao) {
            if (!publicacao.turma || !publicacao.turma.id) {
                var message = {
                    type: 'warning',
                    text: 'Selecione uma turma'
                };
                UTIL.showToaster(message);
                return false;
            }
            if (!publicacao.quiz || !publicacao.quiz.id) {
                var message = {
                    type: 'warning',
                    text: 'Selecione um quiz'
                };
                UTIL.showToaster(message);
                return false;
            }
            if (!publicacao.tsEncerramento || publicacao.tsEncerramento === "") {
                var message = {
                    type: 'warning',
                    text: 'Selecione uma data de encerramento'
                };
                UTIL.showToaster(message);
                return false;
            }
            return true;
        }


        function configDatepicker() {
            var dataInicio = new Date();
            var dataSugerida = new Date().setDate(dataInicio.getDate() + 1);
            var dataFim = new Date();
            dataFim.setDate(dataFim.getDate() + 14)

            publicarQuizCtrl.tsEncerramento = dataSugerida;
            publicarQuizCtrl.onezoneDatepicker = {
                date: dataSugerida, // MANDATORY                     
                mondayFirst: false,
                months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
                daysOfTheWeek: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
                // startDate: dataInicio,
                endDate: dataFim,
                disablePastDays: true,
                disableSwipe: false,
                disableWeekend: false,
                // disableDates: [new Date()],
                // disableDaysOfWeek: disableDaysOfWeek,
                showDatepicker: false,
                showTodayButton: true,
                calendarMode: true,
                hideCancelButton: false,
                hideSetButton: false,
                // highlights: highlights,
                callback: function (value) {
                    publicarQuizCtrl.tsEncerramento = value;
                }
            }
        }
    }
})();