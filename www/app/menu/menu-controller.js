/* global angular */
(function () {
    'use strict';
    angular
            .module('intelequiz')
            .controller('menuCtrl', menuCtrl);
    menuCtrl.$inject = ['DADOS_GLOBAIS', 'SERVICOS_GLOBAIS', '$state'];
    function menuCtrl(DADOS_GLOBAIS, SERVICOS_GLOBAIS, $state) {
        var menuCtrl = this;
        menuCtrl.usuarioLogado = DADOS_GLOBAIS.USUARIO_LOGADO;
    }
})();