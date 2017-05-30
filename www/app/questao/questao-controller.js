/* global angular */
(function () {
    'use strict';
    angular
        .module('intelequiz')
        .controller('questaoCtrl', questaoCtrl);
    questaoCtrl.$inject = ['DADOS', 'SERVICE', 'CLASSES', '$state', '$scope', '$timeout', 'ionicMaterialMotion'];
    function questaoCtrl(DADOS, SERVICE, CLASSES, $state, $scope, $timeout, ionicMaterialMotion) {
        var questaoCtrl = this;

        init();

        function init() {
            SERVICE.displayMaterialInk();
            questaoCtrl.init = init;
            questaoCtrl.usuarioLogado = SERVICE.localStorageUtil.get('USUARIO_LOGADO');
            questaoCtrl.arrayDisciplinas = [];
            questaoCtrl.filtroDisciplina = new CLASSES.Disciplina();
            questaoCtrl.arrayTemas = [];
            questaoCtrl.filtroTema = new CLASSES.Tema();
            questaoCtrl.arrayQuestoes = [];

            questaoCtrl.listTemasByDisciplinaByProfessor = listTemasByDisciplinaByProfessor;
            questaoCtrl.listQuestaoByTema = listQuestaoByTema;

            listDisciplinaByProfessor(questaoCtrl.usuarioLogado);
            $scope.$broadcast('scroll.refreshComplete');
        }

        function listDisciplinaByProfessor(professor) {
            questaoCtrl.arrayTemas = [];
            if (professor) {
                SERVICE.listDisciplinaByProfessor(questaoCtrl.usuarioLogado.matricula).then(function (response) {
                    if (response.data) {
                        DADOS.DISCIPLINAS = response.data;
                        questaoCtrl.arrayDisciplinas = DADOS.DISCIPLINAS;
                        questaoCtrl.filtroDisciplina = questaoCtrl.arrayDisciplinas[0] ? questaoCtrl.arrayDisciplinas[0] : {};
                        listTemasByDisciplinaByProfessor(questaoCtrl.filtroDisciplina);
                    }
                });
            }
        }

        function listTemasByDisciplinaByProfessor(disciplina) {
            questaoCtrl.arrayQuestoes = [];
            if (disciplina) {
                SERVICE.listTemasByDisciplinaByProfessor(questaoCtrl.usuarioLogado.matricula, disciplina.id).then(function (response) {
                    if (response.data) {
                        questaoCtrl.arrayTemas = response.data;
                        DADOS.TEMAS = questaoCtrl.arrayTemas;
                        questaoCtrl.filtroTema = questaoCtrl.arrayTemas[0] ? questaoCtrl.arrayTemas[0] : {};
                        listQuestaoByTema(questaoCtrl.filtroTema);
                    }
                });
            }
        }

        function listQuestaoByTema(tema) {
            if (tema) {
                SERVICE.listQuestaoByTema(tema.id).then(function (response) {
                    if (response.data) {
                        questaoCtrl.arrayQuestoes = response.data;
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