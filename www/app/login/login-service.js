/* global angular */
(function () {
    'use strict';
    angular
            .module('intelequiz')
            .factory('LoginService', LoginService);

    LoginService.$inject = ['$http', '$log'];

    function LoginService($http, $log) {
        var service = {
            autenticar: autenticar
        };
        return service;

        function autenticar(usuario) {
            return $http.post('http://localhost:8084/intelequiz-srv/autenticar', usuario).then(success, error);
        }

        function success(response) {
            $log.info(response);
            return response.data.data;
        }
        function error(response) {
            $log.error(response);
            return null;
        }
    }
})();