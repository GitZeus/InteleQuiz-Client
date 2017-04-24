/* global angular */
(function () {
    'use strict';
    angular
            .module('intelequiz')
            .factory('CLASSES', CLASSES);

    function CLASSES() {
        var classes = {
            Usuario: Usuario,
            Tema: Tema,
            Disciplina: Disciplina,
            Questao: Questao,
            Resposta: Resposta,
        };
        return classes;

        function Usuario() {
            this.login = "";
            this.senha = "";
            this.perfil = "";
        }

        function Tema() {
            this.nome = "";
            this.disciplina = "";
            this.professor = "";
        }

        function Disciplina() {
            this.nome = "";
            this.sigla = "";
        }

        function Questao() {
            this.tipo = "";
            this.nivel = "";
            this.texto = "";
            this.status = "";
            this.respostas = [];
            this.temas = [];
        }

        function Resposta() {
            this.texto = "";
            this.certa = false;
        }
    }
})();