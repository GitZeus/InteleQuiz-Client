/* global angular */
(function () {
    'use strict';
    angular
        .module('intelequiz')
        .controller('questaoCtrl', questaoCtrl);
    questaoCtrl.$inject = ['DADOS', 'SERVICE', 'CLASSES', '$state', '$scope'];
    function questaoCtrl(DADOS, SERVICE, CLASSES, $state, $scope) {
        var questaoCtrl = this;

        init();

        function init() {
            SERVICE.ionicMaterialInk();
            questaoCtrl.init = init;
            questaoCtrl.usuarioLogado = DADOS.USUARIO_LOGADO;
            questaoCtrl.arrayDisciplinas = [];
            questaoCtrl.filtroDisciplina = new CLASSES.Disciplina();
            questaoCtrl.arrayTemas = [];
            questaoCtrl.filtroTema = new CLASSES.Tema();
            questaoCtrl.arrayQuestoes = [];

            questaoCtrl.listTemasByDisciplina = listTemasByDisciplina;
            questaoCtrl.listQuestoesByTema = listQuestoesByTema;

            listDisciplinasByProfessor(questaoCtrl.usuarioLogado);
            $scope.$broadcast('scroll.refreshComplete');
        }

        function listDisciplinasByProfessor(professor) {
            questaoCtrl.arrayTemas = [];
            if (professor) {
                SERVICE.listDisciplinasByProfessor(questaoCtrl.usuarioLogado).then(function (response) {
                    if (response.data) {
                        DADOS.DISCIPLINAS = response.data;
                        questaoCtrl.arrayDisciplinas = DADOS.DISCIPLINAS;
                        questaoCtrl.filtroDisciplina = questaoCtrl.arrayDisciplinas[0] ? questaoCtrl.arrayDisciplinas[0] : {};
                        listTemasByDisciplina(questaoCtrl.filtroDisciplina);
                    }
                });
            }
        }

        function listTemasByDisciplina(disciplina) {
            questaoCtrl.arrayQuestoes = [];
            if (disciplina) {
                SERVICE.listTemasByDisciplina(questaoCtrl.usuarioLogado.matricula, disciplina.id).then(function (response) {
                    if (response.data) {
                        questaoCtrl.arrayTemas = response.data;
                        DADOS.TEMAS = questaoCtrl.arrayTemas;
                        questaoCtrl.filtroTema = questaoCtrl.arrayTemas[0] ? questaoCtrl.arrayTemas[0] : {};
                        listQuestoesByTema(questaoCtrl.filtroTema);
                    }
                });
            }
        }

        function listQuestoesByTema(tema) {
            if (tema) {
                SERVICE.listQuestoesByTema(tema.id).then(function (response) {
                    if (response.data) {
                        questaoCtrl.arrayQuestoes = response.data;
                    }
                });
            }
        }
    }
})();