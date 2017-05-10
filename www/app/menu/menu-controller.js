/* global angular */
(function () {
    'use strict';
    angular
            .module('intelequiz')
            .controller('menuCtrl', menuCtrl);
    menuCtrl.$inject = ['DADOS', 'SERVICE', 'CLASSES', '$state', '$scope'];
    function menuCtrl(DADOS, SERVICE, CLASSES, $state, $scope) {
        var menuCtrl = this;

        init();

        function init() {
            SERVICE.ionicMaterialInk();
            menuCtrl.usuarioLogado = DADOS.USUARIO_LOGADO;
        }
    }
})();