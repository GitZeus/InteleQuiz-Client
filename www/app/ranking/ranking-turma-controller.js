(function () {
    'use strict';

    angular
        .module('intelequiz')
        .controller('rankingTurmaCtrl', rankingTurmaCtrl)

    rankingTurmaCtrl.$inject = ['DADOS', 'SERVICE', 'CLASSES', '$scope', '$state', '$timeout', 'ionicMaterialMotion'];

    function rankingTurmaCtrl(DADOS, SERVICE, CLASSES, $scope, $state, $timeout, ionicMaterialMotion) {
        var rankingTurmaCtrl = this;

        init();

        function init() {
            SERVICE.displayMaterialInk();

            rankingTurmaCtrl.init = init;
            rankingTurmaCtrl.usuarioLogado = SERVICE.localStorageUtil.get('USUARIO_LOGADO');
            rankingTurmaCtrl.arrayRankingTurmas = [];

            listRankingTurmasByUsuario(rankingTurmaCtrl.usuarioLogado);

            $scope.$broadcast('scroll.refreshComplete');
        }

        function listRankingTurmasByUsuario(usuario) {
            if (usuario) {
                if (usuario.perfil === 'PROFESSOR' && usuario.matricula) {
                    SERVICE.getRankingTurmaByProfessor(usuario.matricula).then(function (response) {
                        if (response && response.data) {
                            rankingTurmaCtrl.arrayRankingTurmas = response.data;
                            $timeout(function () {
                                ionicMaterialMotion.blinds({
                                    startVelocity: 1000
                                });
                            });
                        }
                    });
                } else if (usuario.perfil === 'ALUNO' && usuario.ra) {
                    SERVICE.getRankingTurmaByAluno(usuario.ra).then(function (response) {
                        if (response && response.data) {
                            rankingTurmaCtrl.arrayRankingTurmas = response.data;
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
    }
})();
