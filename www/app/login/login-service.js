/* global angular */
(function () {
    'use strict';
    angular
            .module('intelequiz')
            .factory('loginSrvc', loginSrvc);

    loginSrvc.$inject = ['$http', '$log'];

    function loginSrvc($http, $log) {
        var service = {
            autenticar: autenticar,
            listarPerfis:   listarPerfis
        };
        return service;

        function autenticar(usuario) {
            return $http.post('http://192.168.0.4:8084/intelequiz-srv/autenticar', usuario).then(success, error);
        }

        function listarPerfis() {
            return [
                {nome: 'Professor', codigo: '1'},
                {nome: 'Aluno', codigo: '2'},
                {nome: 'Coordenador', codigo: '3'}
            ]
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