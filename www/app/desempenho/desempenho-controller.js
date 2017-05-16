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

            listTurmasByProfessor(desempenhoCtrl.usuarioLogado);

            $scope.$broadcast('scroll.refreshComplete');
        }

        function listTurmasByProfessor(professor) {
            if (professor && professor.matricula) {
                SERVICE.listTurmasByProfessor(professor.matricula).then(function (response) {
                    if (response && response.data && response.data.length > 0) {
                        desempenhoCtrl.arrayTurma = response.data;
                        desempenhoCtrl.filtroTurma = desempenhoCtrl.arrayTurma[0];
                    }
                });
            }
        }
    }
})();