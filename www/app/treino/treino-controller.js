(function () {
    'use strict';

    angular
        .module('intelequiz')
        .controller('treinoCtrl', treinoCtrl)

    treinoCtrl.$inject = ['DADOS', 'SERVICE', 'CLASSES', '$scope', '$timeout','ionicMaterialMotion'];

    function treinoCtrl(DADOS, SERVICE, CLASSES, $scope, $timeout, ionicMaterialMotion) {
        var treinoCtrl = this;

        init();

        function init() {
            SERVICE.ionicMaterialInk();

            treinoCtrl.init = init;
            treinoCtrl.usuarioLogado = DADOS.USUARIO_LOGADO;
            treinoCtrl.arrayTurma = [];
            treinoCtrl.arrayQuizDisponivel = [];

            treinoCtrl.listTreinosDisponiveis = listTreinosDisponiveis;

            listTurmasByAluno(treinoCtrl.usuarioLogado);

            $scope.$broadcast('scroll.refreshComplete');
        }

        function listTurmasByAluno(aluno) {
            if (aluno && aluno.ra) {
                SERVICE.listTurmasByAluno(aluno).then(function (response) {
                    if (response.data && response.data.length > 0) {
                        treinoCtrl.arrayTurma = response.data;
                        treinoCtrl.filtroTurma = treinoCtrl.arrayTurma[0];
                        listTreinosDisponiveis(treinoCtrl.filtroTurma);
                    }
                });
            }
        }

        function listTreinosDisponiveis(turma) {
            if(turma && turma.id){
                SERVICE.listQuizEmAndamentoByTurma(turma.id).then(function (response) {
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