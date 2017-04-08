/* global angular */
(function () {
    'use strict';
    angular
            .module('intelequiz')
            .factory('AppService', AppService)
            .factory('AppData', AppData);

    AppService.$inject = ['AppData', '$window'];
    AppData.$inject = [];

    function AppData() {
        var data = this;

        data.disciplinas = [];
        data.questoes = [];
        data.URL_BASE = "http://192.168.0.4:8084" + "/intelequiz-srv/";

        return data;
    }

    function AppService(AppData, $window) {

        var service = {
            getDisciplinas: getDisciplinas,
            addDisciplina: addDisciplina,
            editDisciplina: editDisciplina,
            deleteDisciplina: deleteDisciplina,
            
            getQuestoes: getQuestoes,
            addQuestao: addQuestao,
            editQuestao: editQuestao,
            deleteQuestao: deleteQuestao
        };
        return service;

        function getDisciplinas() {
            if ($window.localStorage.getItem('disciplinas')) {
                AppData.disciplinas = JSON.parse($window.localStorage.getItem('disciplinas'));
            }
        }

        function addDisciplina(disciplina) {
            AppData.disciplinas.push(disciplina);
            $window.localStorage.setItem('disciplinas', JSON.stringify(AppData.disciplinas));
        }
        
         function editDisciplina(disciplina, indice) {
            AppData.disciplinas[indice] = disciplina;
            $window.localStorage.setItem('disciplinas', JSON.stringify(AppData.disciplinas));
        }

        function deleteDisciplina(indice) {
            AppData.disciplinas.splice(indice, 1);
            $window.localStorage.setItem('disciplinas', JSON.stringify(AppData.disciplinas));
        }

        function getQuestoes() {
            if ($window.localStorage.getItem('questoes')) {
                AppData.questoes = JSON.parse($window.localStorage.getItem('questoes'));
            }
        }

        function addQuestao(questao) {
            AppData.questoes.push(questao);
            $window.localStorage.setItem('questoes', JSON.stringify(AppData.questoes));
        }

        function editQuestao(questao, indice) {
            AppData.questoes[indice] = questao;
            $window.localStorage.setItem('questoes', JSON.stringify(AppData.questoes));
        }

        function deleteQuestao(indice) {
            AppData.questoes.splice(indice, 1);
            $window.localStorage.setItem('questoes', JSON.stringify(AppData.questoes));
        }
    }
})();