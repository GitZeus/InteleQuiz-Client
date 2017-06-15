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
            SERVICE.displayMaterialInk();

            treinoCtrl.init = init;
            treinoCtrl.usuarioLogado = SERVICE.localStorageUtil.get('obj_usuario_logado');
            treinoCtrl.arrayTurma = [];
            treinoCtrl.arrayQuizDisponivel = [];

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
                        listTreinosDisponiveis(treinoCtrl.filtroTurma);
                    }
                });
            }
        }

        function listTreinosDisponiveis(turma) {
            if(turma && turma.id){
                SERVICE.listPublicacaoByStatusByTurma(turma.id, 'PUBLICADO').then(function (response) {
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