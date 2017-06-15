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
            rankingTurmaCtrl.usuarioLogado = SERVICE.localStorageUtil.get('obj_usuario_logado');
            rankingTurmaCtrl.arrayRankingTurmas = [];

            listRankingTurmasByUsuario(rankingTurmaCtrl.usuarioLogado);

            $scope.$broadcast('scroll.refreshComplete');
        }

        function listRankingTurmasByUsuario(usuario) {
            if (usuario) {
                if (usuario.perfil === 'Professor' && usuario.matricula) {
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
                } else if (usuario.perfil === 'Aluno' && usuario.ra) {
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
