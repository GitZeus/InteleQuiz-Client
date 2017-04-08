/* global angular */
(function () {
    'use strict';
    angular
            .module('intelequiz')
            .factory('loginSrvc', loginSrvc);

    loginSrvc.$inject = ['$http', '$log', 'AppData'];

    function loginSrvc($http, $log, AppData) {
        var URL_BASE = AppData.URL_BASE;
        var service = {
            autenticar: autenticar,
            tiposUsuario:   tiposUsuario
        };
        return service;

        function autenticar(usuario) {
            return $http.post(URL_BASE + 'usuario/autenticacao', usuario).then(success, error);
        }

        function tiposUsuario() {
            return $http.get(URL_BASE + 'usuario/tipo').then(success, error);
        }

        function success(response) {
            $log.info(response);
            return response.data;
        }
        function error(response) {
            $log.error(response);
            return {data: null, message: {type: 'ERROR', text: 'Serviço indisponível, tente mais tarde'}};
        }
    }
})();