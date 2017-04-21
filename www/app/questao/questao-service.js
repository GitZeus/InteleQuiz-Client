/* global angular */
(function () {
    'use strict';
    angular
            .module('intelequiz')
            .factory('questaoSrvc', questaoSrvc)
            .factory('questaoDados', questaoDados);

    questaoSrvc.$inject = ['$http', '$log', 'DADOS_GLOBAIS', 'SERVICOS_GLOBAIS'];

    function questaoSrvc($http, $log, DADOS_GLOBAIS, SERVICOS_GLOBAIS) {
        var service = {
            listDisciplinas: function (professor) {
                return $http.post(DADOS_GLOBAIS.URL_BASE + 'professor/disciplinas', professor).then(SERVICOS_GLOBAIS.success, SERVICOS_GLOBAIS.error);
            },
            
            listTemasByDisciplina: function (matricula_professor, disciplina_id) {
                return $http.get(DADOS_GLOBAIS.URL_BASE + 'professor/' + matricula_professor + '/disciplina/' + disciplina_id + '/temas').then(SERVICOS_GLOBAIS.success, SERVICOS_GLOBAIS.error);
            },
            
            listQuestoesByTema: function (tema_id) {
                return $http.get(DADOS_GLOBAIS.URL_BASE + 'tema/' + tema_id + '/questoes').then(SERVICOS_GLOBAIS.success, SERVICOS_GLOBAIS.error);
            },
            
            listTiposQuestao: function(){
                return $http.get(DADOS_GLOBAIS.URL_BASE + 'questoes/tipos').then(SERVICOS_GLOBAIS.success, SERVICOS_GLOBAIS.error);
            },
            
            listNiveisQuestao: function(){
                return $http.get(DADOS_GLOBAIS.URL_BASE + 'questoes/niveis').then(SERVICOS_GLOBAIS.success, SERVICOS_GLOBAIS.error);
            },
            
            listStatusQuizQuestao: function(){
                return $http.get(DADOS_GLOBAIS.URL_BASE + 'questao/status').then(SERVICOS_GLOBAIS.success, SERVICOS_GLOBAIS.error);
            },
            
            saveQuestao: function(questao){
                return $http.post(DADOS_GLOBAIS.URL_BASE + 'questao', questao).then(SERVICOS_GLOBAIS.success, SERVICOS_GLOBAIS.error);
            },
            
            updateQuestao: function(questao){
                return $http.put(DADOS_GLOBAIS.URL_BASE + 'questao', questao).then(SERVICOS_GLOBAIS.success, SERVICOS_GLOBAIS.error);
            }
        };
        return service;
    }
    
    function questaoDados(){
        var dados = {
            DISCIPLINAS : [],
        }
        return dados;
    }
})();