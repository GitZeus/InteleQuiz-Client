/* global angular */
(function () {
    'use strict';
    angular
        .module('intelequiz')
        .controller('menuCtrl', menuCtrl);
    menuCtrl.$inject = ['DADOS', 'UTIL', 'SERVICE', 'CLASSES', '$state', '$scope'];
    function menuCtrl(DADOS, UTIL, SERVICE, CLASSES, $state, $scope) {
        var menuCtrl = this;

        init();

        function init() {
            UTIL.displayMaterialInk();
            menuCtrl.usuarioLogado = UTIL.localStorage.get('obj_usuario_logado');
            menuCtrl.logout = logout;
        }

        function logout() {
            UTIL.localStorage.remove('obj_usuario_logado');
            $state.go('login');
        }
    }
})();