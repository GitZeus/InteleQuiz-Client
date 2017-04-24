/* global angular */
(function () {
    'use strict';
    angular
            .module('intelequiz')
            .controller('menuCtrl', menuCtrl);
    menuCtrl.$inject = ['DADOS', 'SERVICE', 'CLASSES', '$state'];
    function menuCtrl(DADOS, SERVICE, CLASSES, $state) {
        var menuCtrl = this;
        menuCtrl.usuarioLogado = DADOS.USUARIO_LOGADO;
    }
})();