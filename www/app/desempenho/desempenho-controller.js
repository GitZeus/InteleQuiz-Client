(function () {
    'use strict';
    angular.module('intelequiz')
        .controller('desempenhoCtrl', desempenhoCtrl);

    desempenhoCtrl.$inject = ['DADOS', 'SERVICE', 'CLASSES', '$scope', '$state', '$timeout', 'ionicMaterialMotion'];

    function desempenhoCtrl(DADOS, SERVICE, CLASSES, $scope, $state, $timeout, ionicMaterialMotion) {
        var desempenhoCtrl = this;

        init();

        function init() {
            SERVICE.ionicMaterialInk();

            desempenhoCtrl.init = init;
            desempenhoCtrl.usuarioLogado = DADOS.USUARIO_LOGADO;
            desempenhoCtrl.getDesempenhoByTurma = getDesempenhoByTurma;

            listTurmasByProfessor(desempenhoCtrl.usuarioLogado);

            $scope.$broadcast('scroll.refreshComplete');
        }

        function listTurmasByProfessor(professor) {
            if (professor && professor.matricula) {
                SERVICE.listTurmasByProfessor(professor.matricula).then(function (response) {
                    if (response && response.data && response.data.length > 0) {
                        desempenhoCtrl.arrayTurma = response.data;
                        desempenhoCtrl.filtroTurma = desempenhoCtrl.arrayTurma[0];
                        getDesempenhoByTurma(desempenhoCtrl.filtroTurma);
                    }
                });
            }
        }

        function getDesempenhoByTurma(turma) {
            if (turma && turma.id) {
                SERVICE.getDesempenhoByTurma(turma.id).then(function (response) {
                    if (response && response.data) {
                        configGrafico(response.data);
                    }
                });
            }
        }

        function configGrafico(desempenho) {
            desempenhoCtrl.grafico = {};
            desempenhoCtrl.grafico.data = [desempenho.aproveitamentos, desempenho.envolvimentos];
            desempenhoCtrl.grafico.labels = desempenho.encerramentos;
            desempenhoCtrl.grafico.series = ['Aproveitamento', 'Envolvimento'];
            desempenhoCtrl.grafico.click = function (points, evt) {
                console.log(points, evt);
            };
        }
    }
})();