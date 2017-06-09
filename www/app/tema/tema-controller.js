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
            SERVICE.displayMaterialInk();

            temaCtrl.init = init;
            temaCtrl.usuarioLogado = SERVICE.localStorageUtil.get('USUARIO_LOGADO');
            temaCtrl.arrayDisciplinas = [];
            temaCtrl.arrayTemas = [];

            temaCtrl.listTemasByDisciplinaByProfessor = listTemasByDisciplinaByProfessor;
            temaCtrl.saveTema = saveTema;

            listDisciplinaByProfessor(temaCtrl.usuarioLogado);
            $scope.$broadcast('scroll.refreshComplete');
        }

        function listDisciplinaByProfessor(professor) {
            if (professor) {
                SERVICE.listDisciplinaByProfessor(professor.matricula).then(function (response) {
                    if (response.data) {
                        temaCtrl.arrayDisciplinas = response.data;
                        temaCtrl.filtroDisciplina = temaCtrl.arrayDisciplinas[0];
                        temaCtrl.listTemasByDisciplinaByProfessor(temaCtrl.filtroDisciplina);
                    }
                });
            }
        }

        function listTemasByDisciplinaByProfessor(disciplina) {
            temaCtrl.arrayTemas = [];
            if (disciplina) {
                SERVICE.listTemasByDisciplinaByProfessor(temaCtrl.usuarioLogado.matricula, disciplina.id).then(function (response) {
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
                        temaCtrl.listTemasByDisciplinaByProfessor(temaCtrl.filtroDisciplina);
                    }
                });
            }
        }

        function validarTema(tema) {
            if (!tema.nome || tema.nome.length === 0) {
                var message = {
                    type: 'warning',
                    text: 'Informe um nome para o tema'
                };
                SERVICE.showToaster(message);
                return false;
            }
            for (var i = 0; i < temaCtrl.arrayTemas.length; i++) {
                if (temaCtrl.arrayTemas[i].nome == tema.nome) {
                    var message = {
                        type: 'warning',
                        text: 'Já existe um tema com este nome'
                    };
                    SERVICE.showToaster(message);
                    return false;
                }
            }
            return true;
        }
    }
})();