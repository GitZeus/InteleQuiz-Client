/* global angular */
(function () {
    'use strict';
    angular
        .module('intelequiz')
        .controller('questaoCtrl', questaoCtrl);
    questaoCtrl.$inject = ['DADOS', 'UTIL', 'SERVICE', 'CLASSES', '$state', '$scope', '$timeout', 'ionicMaterialMotion'];
    function questaoCtrl(DADOS, UTIL, SERVICE, CLASSES, $state, $scope, $timeout, ionicMaterialMotion) {
        var questaoCtrl = this;

        init();

        function init() {
            UTIL.displayMaterialInk();

            questaoCtrl.init = init;
            questaoCtrl.usuarioLogado = UTIL.localStorage.get('obj_usuario_logado');
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
                questaoCtrl.arrayDisciplinas = array;
                questaoCtrl.filtroDisciplina = questaoCtrl.arrayDisciplinas[0];
                questaoCtrl.listTemasByDisciplinaByProfessor(questaoCtrl.filtroDisciplina);
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