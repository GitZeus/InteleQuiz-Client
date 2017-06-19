(function () {
    'use strict';

    angular
        .module('intelequiz')
        .controller('treinoCtrl', treinoCtrl)

    treinoCtrl.$inject = ['DADOS', 'UTIL', 'SERVICE', 'CLASSES', '$scope', '$timeout', 'ionicMaterialMotion'];

    function treinoCtrl(DADOS, UTIL, SERVICE, CLASSES, $scope, $timeout, ionicMaterialMotion) {
        var treinoCtrl = this;

        init();

        function init() {
            UTIL.displayMaterialInk();

            treinoCtrl.init = init;
            treinoCtrl.usuarioLogado = UTIL.localStorage.get('obj_usuario_logado');
            treinoCtrl.arrayTurma = [];
            treinoCtrl.arrayQuizDisponivel = [];
            treinoCtrl.arrayTreinoRealizado = [];
            treinoCtrl.arrayTreinoPendente = [];

            treinoCtrl.listTreinosDisponiveis = listTreinosDisponiveis;

            listTurmaByAluno(treinoCtrl.usuarioLogado);

            $scope.$broadcast('scroll.refreshComplete');
        }

        function listTurmaByAluno(aluno) {
            if (aluno && aluno.ra) {
                SERVICE.listTurmaByAluno(aluno.ra).then(function (response) {
                    if (response.data && response.data.length > 0) {
                        treinoCtrl.arrayTurma = response.data;
                        treinoCtrl.filtroTurma = treinoCtrl.arrayTurma[0];
                        listTreinoByTurmaByAluno(treinoCtrl.filtroTurma);
                        listTreinosDisponiveis(treinoCtrl.filtroTurma);
                    }
                });
            }
        }

        function listTreinoByTurmaByAluno(turma) {
            if (turma && turma.id) {
                SERVICE.listTreinoByTurmaByAluno(turma.id, treinoCtrl.usuarioLogado.ra).then(function (response) {
                    if (response && response.data) {
                        treinoCtrl.arrayTreinoRealizado = [];
                        treinoCtrl.arrayTreinoPendente = [];
                        for (var i = 0; i < response.data.length; i++) {
                            if (response.data[i].tsFim) {
                                treinoCtrl.arrayTreinoRealizado.push(response.data[i]);
                            } else {
                                treinoCtrl.arrayTreinoPendente.push(response.data[i]);
                            }
                        }

                        // treinoCtrl.arrayQuizDisponivel = response.data;
                        // $timeout(function () {
                        //     ionicMaterialMotion.blinds({
                        //         startVelocity: 1000
                        //     });
                        // });
                    }
                });
            }
        }

        function listTreinosDisponiveis(turma) {
            if (turma && turma.id) {
                SERVICE.listPublicacaoByStatusByTurma(turma.id, 'Publicado').then(function (response) {
                    if (response && response.data) {
                        treinoCtrl.arrayQuizDisponivel = response.data;
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