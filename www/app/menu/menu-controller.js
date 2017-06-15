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
            menuCtrl.usuarioLogado = SERVICE.localStorageUtil.get('obj_usuario_logado');
            menuCtrl.logout = logout;
        }

        function logout() {
            SERVICE.localStorageUtil.remove('obj_usuario_logado');
            $state.go('login');
        }
    }
})();