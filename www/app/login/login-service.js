/* global angular */
(function () {
    'use strict';
    angular
            .module('intelequiz')
            .factory('loginSrvc', loginSrvc);

    loginSrvc.$inject = ['$http', '$log', 'DADOS_GLOBAIS', 'SERVICOS_GLOBAIS'];

    function loginSrvc($http, $log, DADOS_GLOBAIS, SERVICOS_GLOBAIS) {
        var URL_BASE = DADOS_GLOBAIS.URL_BASE;
        var service = {
            autenticar: autenticar,
            tiposUsuario:   tiposUsuario
        };
        return service;

        function autenticar(usuario) {
            return $http.post(URL_BASE + 'usuario/autenticacao', usuario).then(SERVICOS_GLOBAIS.success, SERVICOS_GLOBAIS.error);
        }

        function tiposUsuario() {
            return $http.get(URL_BASE + 'usuario/tipo').then(SERVICOS_GLOBAIS.success, SERVICOS_GLOBAIS.error);
        }
    }
})();