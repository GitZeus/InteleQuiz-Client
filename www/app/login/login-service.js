/* global angular */
(function () {
    'use strict';
    angular
            .module('intelequiz')
            .factory('loginSrvc', loginSrvc);

    loginSrvc.$inject = ['$http', '$log'];

    function loginSrvc($http, $log) {
        var service = {
            autenticar: autenticar
        };
        return service;

        function autenticar(usuario) {
            return $http.post('http://192.168.0.3:8084/intelequiz-srv/autenticar', usuario).then(success, error);
        }

        function success(response) {
            $log.info(response);
            return response.data;
        }
        function error(response) {
            $log.error(response);
            return null;
        }
    }
})();