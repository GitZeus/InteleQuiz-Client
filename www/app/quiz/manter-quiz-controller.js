/* global angular */
(function () {
    'use strict';
    angular
            .module('intelequiz')
            .controller('manterQuizCtrl', manterQuizCtrl);
    manterQuizCtrl.$inject = ['DADOS', 'SERVICE', 'CLASSES', '$state'];
    function manterQuizCtrl(DADOS, SERVICE, CLASSES, $state) {
        var manterQuizCtrl = this;

        init();

        function init() {
            manterQuizCtrl.usuarioLogado = DADOS.USUARIO_LOGADO;
            manterQuizCtrl.arrayDisciplinas = [];
            manterQuizCtrl.filtroDisciplina = new CLASSES.Disciplina();
            manterQuizCtrl.arrayTemas = [];
            manterQuizCtrl.filtroTema = new CLASSES.Tema();
            manterQuizCtrl.filtroNivel = new CLASSES.Questao();
            manterQuizCtrl.filtroTextoQuestao = "";
            manterQuizCtrl.arrayQuestoes = [];
            manterQuizCtrl.arrayQuestoesSelecionadas = [];

            manterQuizCtrl.listTemasByDisciplina = listTemasByDisciplina;
            manterQuizCtrl.selecionarQuestao = selecionarQuestao;

            listDisciplinasByProfessor();
            listNiveisQuestao();
        }

        function listDisciplinasByProfessor() {
            if (DADOS.DISCIPLINAS && DADOS.DISCIPLINAS.length > 0) {
                manterQuizCtrl.arrayDisciplinas = DADOS.DISCIPLINAS || {};
                manterQuizCtrl.filtroDisciplina = manterQuizCtrl.arrayDisciplinas[0] ? manterQuizCtrl.arrayDisciplinas[0] : {};
                listTemasByDisciplina(manterQuizCtrl.filtroDisciplina);
            } else {
                SERVICE.listDisciplinasByProfessor(manterQuizCtrl.usuarioLogado).then(function (response) {
                    if (response.data) {
                        DADOS.DISCIPLINAS = response.data;
                        manterQuizCtrl.arrayDisciplinas = DADOS.DISCIPLINAS;
                        manterQuizCtrl.filtroDisciplina = manterQuizCtrl.arrayDisciplinas[0] ? manterQuizCtrl.arrayDisciplinas[0] : {};
                        listTemasByDisciplina(manterQuizCtrl.filtroDisciplina);
                    }
                });
            }
        }

        function listTemasByDisciplina(disciplina) {
            manterQuizCtrl.arrayTemas = [];
            SERVICE.listTemasByDisciplina(manterQuizCtrl.usuarioLogado.matricula, disciplina.id).then(function (response) {
                if (response.data) {
                    manterQuizCtrl.arrayTemas = response.data;
                    manterQuizCtrl.filtroTema = manterQuizCtrl.arrayTemas[0] ? manterQuizCtrl.arrayTemas[0] : {};
                    listQuestoesByTema(manterQuizCtrl.filtroTema);
                }
            });
        }

        function listNiveisQuestao() {
            if (DADOS.NIVEIS_QUESTAO && DADOS.NIVEIS_QUESTAO.length > 0) {
                manterQuizCtrl.arrayNiveisQuestao = DADOS.NIVEIS_QUESTAO || {};
                manterQuizCtrl.filtroNivel = manterQuizCtrl.arrayNiveisQuestao[0] ? manterQuizCtrl.arrayNiveisQuestao[0] : {};
            } else {
                SERVICE.listNiveisQuestao().then(function (response) {
                    if (response.data) {
                        DADOS.NIVEIS_QUESTAO = response.data;
                        manterQuizCtrl.arrayNiveisQuestao = DADOS.NIVEIS_QUESTAO;
                        manterQuizCtrl.filtroNivel = manterQuizCtrl.arrayNiveisQuestao[0] ? manterQuizCtrl.arrayNiveisQuestao[0] : {};
                    }
                });
            }
        }

        function listQuestoesByTema(tema) {
            if (tema.id) {
                SERVICE.listQuestoesByTema(tema.id).then(function (response) {
                    if (response.data) {
                        manterQuizCtrl.arrayQuestoes = response.data;
                    }
                });
            }
        }

        function selecionarQuestao(questao) {
            console.log("QUESTAO: ", questao);

            if (questao.checked === true) {
                manterQuizCtrl.arrayQuestoesSelecionadas.push(questao);
            } else if (questao.checked === false) {
                angular.forEach(manterQuizCtrl.arrayQuestoesSelecionadas, function (value, index) {
                    if (value.id === questao.id) {
                        manterQuizCtrl.arrayQuestoesSelecionadas.splice(index, 1);
                    }
                });
            }
            console.log(manterQuizCtrl.arrayQuestoesSelecionadas);
        }
    }
})();