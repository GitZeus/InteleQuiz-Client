/* global angular */
(function () {
    'use strict';
    angular
            .module('intelequiz')
            .controller('questaoCtrl', questaoCtrl);
    questaoCtrl.$inject = ['DADOS', 'SERVICE', 'CLASSES', '$state'];
    function questaoCtrl(DADOS, SERVICE, CLASSES, $state) {
        var questaoCtrl = this;

        init();

        function init() {
            questaoCtrl.usuarioLogado = DADOS.USUARIO_LOGADO;
            questaoCtrl.arrayDisciplinas = [];
            questaoCtrl.filtroDisciplina = new CLASSES.Disciplina();
            questaoCtrl.arrayTemas = [];
            questaoCtrl.filtroTema = new CLASSES.Tema();
            questaoCtrl.arrayQuestoes = [];

            questaoCtrl.listTemasByDisciplina = listTemasByDisciplina;
            questaoCtrl.listQuestoesByTema = listQuestoesByTema;
            questaoCtrl.goEditQuestao = goEditQuestao;

            listDisciplinasByProfessor();
        }

        function listDisciplinasByProfessor() {
            questaoCtrl.arrayTemas = [];
            SERVICE.listDisciplinasByProfessor(questaoCtrl.usuarioLogado).then(function (response) {
                if (response.data) {
                    DADOS.DISCIPLINAS = response.data;
                    questaoCtrl.arrayDisciplinas = DADOS.DISCIPLINAS;
                    questaoCtrl.filtroDisciplina = questaoCtrl.arrayDisciplinas[0] ? questaoCtrl.arrayDisciplinas[0] : {};
                    listTemasByDisciplina(questaoCtrl.filtroDisciplina);
                }
            });
        }

        function listTemasByDisciplina(disciplina) {
            questaoCtrl.arrayQuestoes = [];
            if (disciplina.id) {
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
            if (tema.id) {
                SERVICE.listQuestoesByTema(tema.id).then(function (response) {
                    if (response.data) {
                        questaoCtrl.arrayQuestoes = response.data;
                    }
                });
            }
        }

        function goEditQuestao(questao) {
            $state.go('menu.manter-questao', {questao: questao});
        }
    }
})();