/* global angular */
(function () {
    'use strict';
    angular
            .module('intelequiz')
            .controller('questaoCtrl', questaoCtrl);
    questaoCtrl.$inject = ['DADOS_GLOBAIS', 'SERVICOS_GLOBAIS', 'questaoSrvc', 'questaoDados', '$state', 'ionicMaterialInk', 'ionicMaterialMotion'];
    function questaoCtrl(DADOS_GLOBAIS, SERVICOS_GLOBAIS, questaoSrvc, questaoDados, $state, ionicMaterialInk, ionicMaterialMotion) {
        var questaoCtrl = this;
        var questaoSrvc = questaoSrvc;
        questaoCtrl.usuarioLogado = DADOS_GLOBAIS.USUARIO_LOGADO;

        ionicMaterialInk.displayEffect();
//        ionicMaterialMotion.ripple();

        questaoCtrl.listDisciplinas = [];
        questaoCtrl.filtroDisciplina = {};
        questaoCtrl.listTemas = [];
        questaoCtrl.filtroTema = {};
        questaoCtrl.listQuestoes = [];

        questaoCtrl.listTemasByDisciplina = listTemasByDisciplina;

        questaoSrvc.listDisciplinas(questaoCtrl.usuarioLogado).then(function (response) {
            if (response.data) {
                questaoDados.DISCIPLINAS = response.data;
                questaoCtrl.listDisciplinas = questaoDados.DISCIPLINAS;
                questaoCtrl.filtroDisciplina = questaoCtrl.listDisciplinas[0];
                listTemasByDisciplina(questaoCtrl.usuarioLogado.matricula, questaoCtrl.filtroDisciplina.id);
            }
        });

        function listTemasByDisciplina(matricula_professor, disciplina_id) {
            questaoSrvc.listTemasByDisciplina(matricula_professor, disciplina_id).then(function (response) {
                if (response.data) {
                    questaoCtrl.listTemas = response.data;
                    questaoCtrl.filtroTema = questaoCtrl.listTemas[0];
                    listQuestoesByTema(questaoCtrl.filtroTema.id);
                }
            });
        }

        function listQuestoesByTema(tema_id) {
            questaoSrvc.listQuestoesByTema(tema_id).then(function (response) {
                if (response.data) {
                    questaoCtrl.listQuestoes = response.data;
                }
            });
        }
    }
})();