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
            SERVICE.displayMaterialInk();
            menuCtrl.usuarioLogado = SERVICE.localStorageUtil.get('USUARIO_LOGADO');
            menuCtrl.logout = logout;
        }

        function logout() {
            SERVICE.localStorageUtil.remove('USUARIO_LOGADO');
            $state.go('login');
        }
    }
})();