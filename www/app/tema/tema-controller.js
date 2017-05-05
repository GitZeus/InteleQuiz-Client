/* global angular */
(function () {
    'use strict';
    angular
        .module('intelequiz')
        .controller('temaCtrl', temaCtrl);
    temaCtrl.$inject = ['DADOS', 'SERVICE', 'CLASSES', '$scope', 'ionicMaterialMotion', '$timeout'];
    function temaCtrl(DADOS, SERVICE, CLASSES, $scope, ionicMaterialMotion, $timeout) {
        var temaCtrl = this;

        init();

        function init() {
            SERVICE.ionicMaterialInk();

            temaCtrl.init = init;
            temaCtrl.usuarioLogado = DADOS.USUARIO_LOGADO;
            temaCtrl.arrayDisciplinas = [];
            temaCtrl.arrayTemas = [];

            temaCtrl.listTemasByDisciplina = listTemasByDisciplina;
            temaCtrl.saveTema = saveTema;

            listDisciplinasByProfessor(temaCtrl.usuarioLogado);
            $scope.$broadcast('scroll.refreshComplete');
        }

        function listDisciplinasByProfessor(professor) {
            if (professor) {
                SERVICE.listDisciplinasByProfessor(professor).then(function (response) {
                    if (response.data) {
                        temaCtrl.arrayDisciplinas = response.data;
                        temaCtrl.filtroDisciplina = temaCtrl.arrayDisciplinas[0];
                        temaCtrl.listTemasByDisciplina(temaCtrl.filtroDisciplina);
                    }
                });
            }
        }

        function listTemasByDisciplina(disciplina) {
            temaCtrl.arrayTemas = [];
            if (disciplina) {
                SERVICE.listTemasByDisciplina(temaCtrl.usuarioLogado.matricula, disciplina.id).then(function (response) {
                    if (response.data) {
                        temaCtrl.arrayTemas = response.data;
                        $timeout(function () {
                            ionicMaterialMotion.blinds({
                                startVelocity: 1000
                            });
                        });
                    }
                });
            }
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