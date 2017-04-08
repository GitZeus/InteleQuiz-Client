/* global angular */
(function () {
    'use strict';
    angular
            .module('intelequiz')
            .factory('questaoSrvc', questaoSrvc);

    questaoSrvc.$inject = ['$http', '$log','AppData'];

    function questaoSrvc($http, $log, AppData) {
        var URL_BASE = AppData.URL_BASE;
        var service = {
            listDisciplinas : listDisciplinas,
            listTags : listTags,
            listQuestoes:listQuestoes
        };
        return service;

        function listDisciplinas(professor) {
            return $http.post(URL_BASE + 'professor/disciplinas', professor).then(success, error);
        }
        
        function listTags(disciplina) {
            return $http.post(URL_BASE + 'disciplinaResource/listTagsByDisciplina', disciplina).then(success, error);
        }
        
        function listQuestoes() {
            return $http.post(URL_BASE + 'disciplinaResource/listQuestoesByTag').then(success, error);
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