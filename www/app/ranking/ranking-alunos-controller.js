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
            rankingAlunoCtrl.turma = $state.params.turma- i o

            listRankingAlunosByTurma(rankingAlunoCtrl.usuarioLogado);

            $scope.$broadcast('scroll.refreshComplete');
        }

        function listRankingTurmasByUsuario(usuario) {
            if (usuario) {
                if (usuario.perfil === 'PROFESSOR' && usuario.matricula) {
                    SERVICE.listRankingTurmasByProfessor(usuario.matricula).then(function (response) {
                        if (response && response.data) {
                            rankingAlunoCtrl.arrayRankingAlunos = response.data;
                        }
                    });
                } else if (usuario.perfil === 'ALUNO' && usuario.ra) {
                    SERVICE.listRankingTurmasByAluno(usuario.ra).then(function (response) {
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
    }
})();
