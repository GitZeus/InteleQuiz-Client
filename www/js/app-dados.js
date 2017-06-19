/* global angular */
(function () {
    'use strict';
    angular
        .module('intelequiz')
        .factory('DADOS', DADOS);

    DADOS.$inject = ['$log'];

    function DADOS($log) {
        var dados = {};
        $log.info("DADOS: ", dados);
        return dados;
    }
})();