(function () {
    'use strict';

    angular
        .module('intelequiz')
        .controller('rankingAlunoCtrl', rankingAlunoCtrl)

    rankingAlunoCtrl.$inject = ['DADOS', 'UTIL', 'SERVICE', 'CLASSES', '$scope', '$state', '$timeout', 'ionicMaterialMotion'];

    function rankingAlunoCtrl(DADOS, UTIL, SERVICE, CLASSES, $scope, $state, $timeout, ionicMaterialMotion) {
        var rankingAlunoCtrl = this;

        init();

        function init() {
            UTIL.displayMaterialInk();

            rankingAlunoCtrl.init = init;
            rankingAlunoCtrl.usuarioLogado = UTIL.localStorage.get('obj_usuario_logado');
            rankingAlunoCtrl.arrayRankingAlunos = [];
            rankingAlunoCtrl.turma = $state.params.turma;

            getRankingAlunoByTurma(rankingAlunoCtrl.turma);

            $scope.$broadcast('scroll.refreshComplete');
        }

        function getRankingAlunoByTurma(turma) {
            if (turma && turma.id) {
                SERVICE.getRankingAlunoByTurma(turma.id).then(function (response) {
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
