(function () {
    'use strict';

    angular
        .module('intelequiz')
        .controller('rankingAlunoCtrl', rankingAlunoCtrl)

    rankingAlunoCtrl.$inject = ['DADOS', 'SERVICE', 'CLASSES', '$scope', '$state', '$timeout', 'ionicMaterialMotion'];

    function rankingAlunoCtrl(DADOS, SERVICE, CLASSES, $scope, $state, $timeout, ionicMaterialMotion) {
        var rankingAlunoCtrl = this;

        init();

        function init() {
            SERVICE.ionicMaterialInk();

            rankingAlunoCtrl.init = init;
            rankingAlunoCtrl.usuarioLogado = DADOS.USUARIO_LOGADO;
            rankingAlunoCtrl.arrayRankingAlunos = [];
            rankingAlunoCtrl.turma = $state.params.turma;

            listRankingAlunosByTurma(rankingAlunoCtrl.turma);

            $scope.$broadcast('scroll.refreshComplete');
        }

        function listRankingAlunosByTurma(turma) {
            if (turma && turma.id) {
                SERVICE.listRankingAlunosByTurma(turma.id).then(function (response) {
                    if (response && response.data) {
                        rankingAlunoCtrl.arrayRankingAlunos = response.data;
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
