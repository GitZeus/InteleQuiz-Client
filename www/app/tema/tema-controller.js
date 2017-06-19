/* global angular */
(function () {
    'use strict';
    angular
        .module('intelequiz')
        .controller('temaCtrl', temaCtrl);
    temaCtrl.$inject = ['DADOS', 'UTIL', 'SERVICE', 'CLASSES', '$scope', 'ionicMaterialMotion', '$timeout'];
    function temaCtrl(DADOS, UTIL, SERVICE, CLASSES, $scope, ionicMaterialMotion, $timeout) {
        var temaCtrl = this;

        init();

        function init() {
            UTIL.displayMaterialInk();

            temaCtrl.init = init;
            temaCtrl.usuarioLogado = UTIL.localStorage.get('obj_usuario_logado');
            temaCtrl.arrayDisciplinas = [];
            temaCtrl.arrayTemas = [];

            temaCtrl.listTemasByDisciplinaByProfessor = listTemasByDisciplinaByProfessor;
            temaCtrl.saveTema = saveTema;

            listDisciplinaByProfessor(temaCtrl.usuarioLogado);

            $scope.$broadcast('scroll.refreshComplete');
        }

        function listDisciplinaByProfessor(professor) {
            if (professor) {
                if (DADOS.arr_disciplina && DADOS.arr_disciplina.length > 0) {
                    _montarDisciplinas(DADOS.arr_disciplina);
                } else {
                    SERVICE.listDisciplinaByProfessor(professor.matricula).then(function (response) {
                        DADOS.arr_disciplina = response.data;
                        _montarDisciplinas(DADOS.arr_disciplina);
                    });
                }
            }
        }

        function _montarDisciplinas(array) {
            if (array && array.length > 0) {
                temaCtrl.arrayDisciplinas = array;
                temaCtrl.filtroDisciplina = temaCtrl.arrayDisciplinas[0];
                temaCtrl.listTemasByDisciplinaByProfessor(temaCtrl.filtroDisciplina);
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
                UTIL.showToaster(message);
                return false;
            }
            return true;
        }
    }
})();