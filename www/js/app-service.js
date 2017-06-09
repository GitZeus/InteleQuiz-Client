/* global angular */
(function () {
    'use strict';
    angular
        .module('intelequiz')
        .factory('DADOS', DADOS)
        .factory('SERVICE', SERVICE);

    DADOS.$inject = ['$log'];
    SERVICE.$inject = ['DADOS', '$http', '$log', 'toaster', 'ionicMaterialInk'];

    function DADOS($log) {
        var data = {
//             URL_BASE: "https://intelequiz.herokuapp.com/",
             URL_BASE: "http://192.168.0.2:8080/",
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
        var ResourceUsuario = "ResourceUsuario";
        var ResourceTema = "ResourceTema";
        var ResourceQuestao = "ResourceQuestao";
        var ResourceDisciplina = "ResourceDisciplina";
        var ResourceQuiz = "ResourceQuiz";
        var ResourcePublicacao = "ResourcePublicacao";
        var ResourceTurma = "ResourceTurma";
        var ResourceTreino = "ResourceTreino";
        var ResourceRanking = "ResourceRanking";
        var ResourceDesempenho = "ResourceDesempenho";

        var localStorageUtil = {
            set: function (key, value) {
                return localStorage.setItem(key, JSON.stringify(value));
            },
            get: function (key) {
                return JSON.parse(localStorage.getItem(key));
            },
            remove: function (key) {
                return localStorage.removeItem(key);
            }
        }

        var service = {

            // ResourceUsuario
            getUsuarioByLoginSenha: getUsuarioByLoginSenha,
            listPerfilUsuario: listPerfilUsuario,

            // ResourceTema
            saveTema: saveTema,
            listTemasByDisciplinaByProfessor: listTemasByDisciplinaByProfessor,
            listTemaByQuestao: listTemaByQuestao,

            // ResourceQuestao
            listTipoQuestao: listTipoQuestao,
            listNivelQuestao: listNivelQuestao,
            listStatusQuizQuestao: listStatusQuizQuestao,
            saveQuestao: saveQuestao,
            updateQuestao: updateQuestao,
            listQuestaoByQuiz: listQuestaoByQuiz,
            listQuestaoByTema: listQuestaoByTema,

            //ResourceDisciplina
            listDisciplinaByProfessor: listDisciplinaByProfessor,

            // ResourceQuiz
            saveQuiz: saveQuiz,
            updateQuiz: updateQuiz,
            listQuizByDisciplinaByProfessor: listQuizByDisciplinaByProfessor,

            // ResourcePublicacao
            savePublicacao: savePublicacao,
            listPublicacaoByStatusByTurma: listPublicacaoByStatusByTurma,

            // ResourceTurma
            listTurmaByProfessor: listTurmaByProfessor,
            listTurmaByProfessorByDisciplina: listTurmaByProfessorByDisciplina,
            listTurmaByAluno: listTurmaByAluno,

            // ResourceTreino
            saveTreino: saveTreino,
            updateTreino: updateTreino,
            getTreinoById: getTreinoById,

            // ResourceRanking
            getRankingTurmaByProfessor: getRankingTurmaByProfessor,
            getRankingTurmaByAluno: getRankingTurmaByAluno,
            getRankingAlunoByTurma: getRankingAlunoByTurma,

            // ResourceDesempenho
            getDesempenhoByTurmaByProfessor: getDesempenhoByTurmaByProfessor,
            getDesempenhoByTurmaByAluno: getDesempenhoByTurmaByAluno,
            getTemaCriticoByPublicacao: getTemaCriticoByPublicacao,
            getTemaCriticoByPublicacaoByAluno: getTemaCriticoByPublicacaoByAluno,
            listQuestaoCriticaByPublicacaoByTemaCritico: listQuestaoCriticaByPublicacaoByTemaCritico,
            listQuestaoCriticaByPublicacaoByAlunoByTemaCritico: listQuestaoCriticaByPublicacaoByAlunoByTemaCritico,

            // Funcoes Utilitarias
            showToaster: showToaster,
            displayMaterialInk: displayMaterialInk,
            localStorageUtil: localStorageUtil
        };
        return service;

        function getUsuarioByLoginSenha(usuario) {
            return $http.post(DADOS.URL_BASE + ResourceUsuario + '/usuario', usuario).then(success, error);
        }
        function listPerfilUsuario() {
            return $http.get(DADOS.URL_BASE + ResourceUsuario + '/usuario/perfil').then(success, error);
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        function saveTema(tema) {
            return $http.post(DADOS.URL_BASE + ResourceTema + '/tema/', tema).then(success, error);
        }
        function listTemasByDisciplinaByProfessor(matricula, id) {
            return $http.get(DADOS.URL_BASE + ResourceTema + '/professor/' + matricula + '/disciplina/' + id + '/tema').then(success, error);
        }
        function listTemaByQuestao(id) {
            return $http.get(DADOS.URL_BASE + ResourceTema + '/questao/' + id + '/tema').then(success, error);
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        function listTipoQuestao() {
            return $http.get(DADOS.URL_BASE + ResourceQuestao + '/questao/tipo').then(success, error);
        }
        function listNivelQuestao() {
            return $http.get(DADOS.URL_BASE + ResourceQuestao + '/questao/nivel').then(success, error);
        }
        function listStatusQuizQuestao() {
            return $http.get(DADOS.URL_BASE + ResourceQuestao + '/questao/status').then(success, error);
        }
        function saveQuestao(questao) {
            return $http.post(DADOS.URL_BASE + ResourceQuestao + '/questao', questao).then(success, error);
        }
        function updateQuestao(questao) {
            return $http.put(DADOS.URL_BASE + ResourceQuestao + '/questao', questao).then(success, error);
        }
        function listQuestaoByQuiz(id) {
            return $http.get(DADOS.URL_BASE + ResourceQuestao + '/quiz/' + id + '/questao').then(success, error);
        }
        function listQuestaoByTema(id) {
            return $http.get(DADOS.URL_BASE + ResourceQuestao + '/tema/' + id + '/questao').then(success, error);
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        function listDisciplinaByProfessor(matricula) {
            return $http.get(DADOS.URL_BASE + ResourceDisciplina + '/professor/' + matricula + '/disciplina').then(success, error);
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        function saveQuiz(quiz) {
            return $http.post(DADOS.URL_BASE + ResourceQuiz + '/quiz/', quiz).then(success, error);
        }
        function updateQuiz(quiz) {
            return $http.put(DADOS.URL_BASE + ResourceQuiz + '/quiz/', quiz).then(success, error);
        }
        function listQuizByDisciplinaByProfessor(matricula, id) {
            return $http.get(DADOS.URL_BASE + ResourceQuiz + '/professor/' + matricula + '/disciplina/' + id + '/quiz').then(success, error);
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        function savePublicacao(publicacao) {
            return $http.post(DADOS.URL_BASE + ResourcePublicacao + '/publicacao/', publicacao).then(success, error);
        }
        function listPublicacaoByStatusByTurma(id, status) {
            return $http.get(DADOS.URL_BASE + ResourcePublicacao + '/turma/' + id + '/quiz?status=' + status).then(success, error);
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        function listTurmaByProfessor(matricula) {
            return $http.get(DADOS.URL_BASE + ResourceTurma + '/professor/' + matricula + '/turma').then(success, error);
        }
        function listTurmaByProfessorByDisciplina(matricula, id) {
            return $http.get(DADOS.URL_BASE + ResourceTurma + '/professor/' + matricula + '/disciplina/' + id + '/turma').then(success, error);
        }
        function listTurmaByAluno(ra) {
            return $http.get(DADOS.URL_BASE + ResourceTurma + '/aluno/' + ra + '/turma').then(success, error);
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        function saveTreino(ra, id) {
            return $http.post(DADOS.URL_BASE + ResourceTreino + '/aluno/' + ra + '/publicacao/' + id + '/treino').then(success, error);
        }
        function updateTreino(treino) {
            return $http.put(DADOS.URL_BASE + ResourceTreino + '/treino/', treino).then(success, error);
        }
        function getTreinoById(id) {
            return $http.get(DADOS.URL_BASE + ResourceTreino + '/treino/' + id).then(success, error);
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        function getRankingTurmaByProfessor(matricula) {
            return $http.get(DADOS.URL_BASE + ResourceRanking + '/professor/' + matricula + '/turma/ranking').then(success, error);
        }
        function getRankingTurmaByAluno(ra) {
            return $http.get(DADOS.URL_BASE + ResourceRanking + '/aluno/' + ra + '/turma/ranking').then(success, error);
        }
        function getRankingAlunoByTurma(id) {
            return $http.get(DADOS.URL_BASE + ResourceRanking + '/turma/' + id + '/aluno/ranking').then(success, error);
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        function getDesempenhoByTurmaByProfessor(id) {
            return $http.get(DADOS.URL_BASE + ResourceDesempenho + '/turma/' + id + '/desempenho').then(success, error);
        }
        function getDesempenhoByTurmaByAluno(id, ra) {
            return $http.get(DADOS.URL_BASE + ResourceDesempenho + '/turma/' + id + '/aluno/' + ra + '/desempenho').then(success, error);
        }
        function getTemaCriticoByPublicacao(id) {
            return $http.get(DADOS.URL_BASE + ResourceDesempenho + '/publicacao/' + id + '/temaCritico').then(success, error);
        }
        function getTemaCriticoByPublicacaoByAluno(id, ra) {
            return $http.get(DADOS.URL_BASE + ResourceDesempenho + '/publicacao/' + id + '/aluno/' + ra + '/temaCritico').then(success, error);
        }
        function listQuestaoCriticaByPublicacaoByTemaCritico(publicacao_id, tema_id) {
            return $http.get(DADOS.URL_BASE + ResourceDesempenho + '/publicacao/' + publicacao_id + '/temaCritico/' + tema_id + '/questao').then(success, error);
        }
        function listQuestaoCriticaByPublicacaoByAlunoByTemaCritico(publicacao_id, ra, tema_id) {
            return $http.get(DADOS.URL_BASE + ResourceDesempenho + '/publicacao/' + publicacao_id + '/aluno/' + ra + '/temaCritico/' + tema_id + '/questao').then(success, error);
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        function success(response) {
            $log.info(response);
            return response.data;
        }

        function error(response) {
            $log.error(response);
            response.data = null;
            return response;
        }

        function showToaster(message) {
            toaster.pop({
                "type": message.type,
                "body": message.text
            });
        }

        function displayMaterialInk() {
            ionicMaterialInk.displayEffect();
        }
    }
})();
