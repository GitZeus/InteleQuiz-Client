/* global angular */
(function () {
    'use strict';
    angular
            .module('intelequiz')
            .factory('CLASSES', CLASSES);

    function CLASSES() {
        var classes = {
            Questao: Questao,
            Resposta: Resposta,
        };
        return classes;

        function Questao() {
            this.tipo = "";
            this.nivel = "";
            this.texto = "";
            this.status = "";
            this.respostas = [];
        }

        function Resposta() {
            this.texto = "";
            this.certa = false;
        }
    }
})();