/* global angular */
(function () {
    'use strict';
    angular
            .module('intelequiz')
            .controller('temaCtrl', temaCtrl);
    temaCtrl.$inject = ['DADOS', 'SERVICE', 'CLASSES'];
    function temaCtrl(DADOS, SERVICE, CLASSES) {
        var temaCtrl = this;

        init();

        function init() {
            temaCtrl.usuarioLogado = DADOS.USUARIO_LOGADO;
            temaCtrl.arrayDisciplinas = [];
            temaCtrl.arrayTemas = [];

            temaCtrl.listTemasByDisciplina = listTemasByDisciplina;
            temaCtrl.saveTema = saveTema;

            listDisciplinasByProfessor();
        }

        function listDisciplinasByProfessor() {
            SERVICE.listDisciplinasByProfessor(temaCtrl.usuarioLogado).then(function (response) {
                if (response.data) {
                    temaCtrl.arrayDisciplinas = response.data;
                    temaCtrl.filtroDisciplina = temaCtrl.arrayDisciplinas[0];
                    temaCtrl.listTemasByDisciplina(temaCtrl.filtroDisciplina);
                }
            });
        }

        function listTemasByDisciplina(disciplina) {
            temaCtrl.arrayTemas = [];
            SERVICE.listTemasByDisciplina(temaCtrl.usuarioLogado.matricula, disciplina.id).then(function (response) {
                if (response.data) {
                    temaCtrl.arrayTemas = response.data;
                }
            });
        }

        function saveTema(nomeTema) {
            var tema = new CLASSES.Tema();
            tema.nome = nomeTema;
            tema.disciplina = temaCtrl.filtroDisciplina;
            tema.professor = temaCtrl.usuarioLogado;
            if (validarTema(tema)) {
                SERVICE.saveTema(tema).then(function (response) {
                    if (response && response.message) {
                        if (response.message.type !== "error") {
                            temaCtrl.filtroNomeTema = "";
                        }
                        temaCtrl.listTemasByDisciplina(temaCtrl.filtroDisciplina);
                    }
                });
            }
        }

        function validarTema(tema) {
            if (!tema.nome || tema.nome.length === 0) {
                var message = {
                    type: 'warning',
                    text: 'Digite um nome para o tema'
                };
                SERVICE.showToaster(message);
                return false;
            }
            return true;
        }
    }
})();