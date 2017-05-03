/* global angular */
(function () {
    'use strict';
    angular
        .module('intelequiz')
        .factory('DADOS', DADOS)
        .factory('SERVICE', SERVICE);

    DADOS.$inject = ['$log'];
    SERVICE.$inject = ['DADOS', '$http', '$log', 'toaster','ionicMaterialInk'];

    function DADOS($log) {
        var data = {
             URL_BASE: "https://intelequiz.herokuapp.com/",
//            URL_BASE: "http://10.61.13.37:8080/",
            USUARIO_LOGADO: {},
            TIPOS_USUARIO: [],
            NIVEIS_QUESTAO: [],
            TIPOS_QUESTAO: [],
            STATUS_QUIZ_QUESTAO: []
        };
        $log.info("DADOS: ", data);
        return data;
    }

    function SERVICE(DADOS, $http, $log, toaster, ionicMaterialInk) {
        var service = {
            autenticar: function (usuario) {
                return $http.post(DADOS.URL_BASE + 'usuario/autenticacao', usuario).then(success, error);
            },
            listTiposUsuario: function () {
                return $http.get(DADOS.URL_BASE + 'usuario/tipo').then(success, error);
            },
            listDisciplinasByProfessor: function (professor) {
                return $http.post(DADOS.URL_BASE + 'professor/disciplinas', professor).then(success, error);
            },
            listTemasByDisciplina: function (matricula_professor, disciplina_id) {
                return $http.get(DADOS.URL_BASE + 'professor/' + matricula_professor + '/disciplina/' + disciplina_id + '/temas').then(success, error);
            },
            listQuestoesByTema: function (tema_id) {
                return $http.get(DADOS.URL_BASE + 'tema/' + tema_id + '/questoes').then(success, error);
            },
            listTiposQuestao: function () {
                return $http.get(DADOS.URL_BASE + 'questoes/tipos').then(success, error);
            },
            listNiveisQuestao: function () {
                return $http.get(DADOS.URL_BASE + 'questoes/niveis').then(success, error);
            },
            listStatusQuizQuestao: function () {
                return $http.get(DADOS.URL_BASE + 'questao/status').then(success, error);
            },
            listTemasByQuestao: function (questao_id) {
                return $http.get(DADOS.URL_BASE + 'questao/' + questao_id + '/temas').then(success, error);
            },
            saveQuestao: function (questao) {
                return $http.post(DADOS.URL_BASE + 'questao', questao).then(success, error);
            },
            updateQuestao: function (questao) {
                return $http.put(DADOS.URL_BASE + 'questao', questao).then(success, error);
            },
            saveTema: function (tema) {
                return $http.post(DADOS.URL_BASE + 'tema/', tema).then(success, error);
            },
            listQuizByDisciplina: function (matricula_professor, disciplina_id) {
                return $http.get(DADOS.URL_BASE + 'professor/' + matricula_professor + '/disciplina/' + disciplina_id + '/quiz').then(success, error);
            },
            listQuestoesByQuiz: function (quiz_id) {
                return $http.get(DADOS.URL_BASE + 'quiz/' + quiz_id + '/questao').then(success, error);
            },
            listTurmasByProfessor: function (matricula) {
                return $http.get(DADOS.URL_BASE + 'professor/' + matricula + '/turma').then(success, error);
            },
            saveQuiz: function (quiz) {
                return $http.post(DADOS.URL_BASE + 'quiz/', quiz).then(success, error);
            },
            updateQuiz: function (quiz) {
                return $http.put(DADOS.URL_BASE + 'quiz/', quiz).then(success, error);
            },
            listTurmasByAluno: function (aluno) {
                return $http.get(DADOS.URL_BASE + 'aluno/' + aluno.ra + '/disciplina').then(success, error);
            },
            showToaster: function (message) {
                toaster.pop({
                    "type": message.type,
                    "body": message.text
                });
            },
            ionicMaterialInk: function(){
                ionicMaterialInk.displayEffect();
            }
        };
        return service;

        function success(response) {
            $log.info(response);
            return response.data;
        }
        function error(response) {
            $log.error(response);
            response.data = null;
            return response;
        }
    }
})();