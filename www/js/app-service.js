/* global angular */
(function () {
    'use strict';
    angular
        .module('intelequiz')
        .factory('SERVICE', SERVICE);

    SERVICE.$inject = ['UTIL', '$http', '$rootScope'];

    function SERVICE(UTIL, $http, $rootScope) {
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
            listQuestaoContinuacaoByTreino: listQuestaoContinuacaoByTreino,

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
            listTreinoByTurmaByAluno: listTreinoByTurmaByAluno,

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
        };
        return service;

        function getUsuarioByLoginSenha(usuario) {
            return $http.post($rootScope.URL_BASE + ResourceUsuario + '/usuario', usuario).then(UTIL.success, UTIL.error);
        }
        function listPerfilUsuario() {
            return $http.get($rootScope.URL_BASE + ResourceUsuario + '/usuario/perfil').then(UTIL.success, UTIL.error);
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        function saveTema(tema) {
            return $http.post($rootScope.URL_BASE + ResourceTema + '/tema/', tema).then(UTIL.success, UTIL.error);
        }
        function listTemasByDisciplinaByProfessor(matricula, id) {
            return $http.get($rootScope.URL_BASE + ResourceTema + '/professor/' + matricula + '/disciplina/' + id + '/tema').then(UTIL.success, UTIL.error);
        }
        function listTemaByQuestao(id) {
            return $http.get($rootScope.URL_BASE + ResourceTema + '/questao/' + id + '/tema').then(UTIL.success, UTIL.error);
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        function listTipoQuestao() {
            return $http.get($rootScope.URL_BASE + ResourceQuestao + '/questao/tipo').then(UTIL.success, UTIL.error);
        }
        function listNivelQuestao() {
            return $http.get($rootScope.URL_BASE + ResourceQuestao + '/questao/nivel').then(UTIL.success, UTIL.error);
        }
        function listStatusQuizQuestao() {
            return $http.get($rootScope.URL_BASE + ResourceQuestao + '/questao/status').then(UTIL.success, UTIL.error);
        }
        function saveQuestao(questao) {
            return $http.post($rootScope.URL_BASE + ResourceQuestao + '/questao', questao).then(UTIL.success, UTIL.error);
        }
        function updateQuestao(questao) {
            return $http.put($rootScope.URL_BASE + ResourceQuestao + '/questao', questao).then(UTIL.success, UTIL.error);
        }
        function listQuestaoByQuiz(id) {
            return $http.get($rootScope.URL_BASE + ResourceQuestao + '/quiz/' + id + '/questao').then(UTIL.success, UTIL.error);
        }
        function listQuestaoByTema(id) {
            return $http.get($rootScope.URL_BASE + ResourceQuestao + '/tema/' + id + '/questao').then(UTIL.success, UTIL.error);
        }
        function listQuestaoContinuacaoByTreino(id) {
            return $http.get($rootScope.URL_BASE + ResourceQuestao + '/treino/' + id + '/questao').then(UTIL.success, UTIL.error);
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        function listDisciplinaByProfessor(matricula) {
            return $http.get($rootScope.URL_BASE + ResourceDisciplina + '/professor/' + matricula + '/disciplina').then(UTIL.success, UTIL.error);
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        function saveQuiz(quiz) {
            return $http.post($rootScope.URL_BASE + ResourceQuiz + '/quiz/', quiz).then(UTIL.success, UTIL.error);
        }
        function updateQuiz(quiz) {
            return $http.put($rootScope.URL_BASE + ResourceQuiz + '/quiz/', quiz).then(UTIL.success, UTIL.error);
        }
        function listQuizByDisciplinaByProfessor(matricula, id) {
            return $http.get($rootScope.URL_BASE + ResourceQuiz + '/professor/' + matricula + '/disciplina/' + id + '/quiz').then(UTIL.success, UTIL.error);
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        function savePublicacao(publicacao) {
            return $http.post($rootScope.URL_BASE + ResourcePublicacao + '/publicacao/', publicacao).then(UTIL.success, UTIL.error);
        }
        function listPublicacaoByStatusByTurma(id, status) {
            return $http.get($rootScope.URL_BASE + ResourcePublicacao + '/turma/' + id + '/quiz?status=' + status).then(UTIL.success, UTIL.error);
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        function listTurmaByProfessor(matricula) {
            return $http.get($rootScope.URL_BASE + ResourceTurma + '/professor/' + matricula + '/turma').then(UTIL.success, UTIL.error);
        }
        function listTurmaByProfessorByDisciplina(matricula, id) {
            return $http.get($rootScope.URL_BASE + ResourceTurma + '/professor/' + matricula + '/disciplina/' + id + '/turma').then(UTIL.success, UTIL.error);
        }
        function listTurmaByAluno(ra) {
            return $http.get($rootScope.URL_BASE + ResourceTurma + '/aluno/' + ra + '/turma').then(UTIL.success, UTIL.error);
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        function saveTreino(ra, id) {
            return $http.post($rootScope.URL_BASE + ResourceTreino + '/aluno/' + ra + '/publicacao/' + id + '/treino').then(UTIL.success, UTIL.error);
        }
        function updateTreino(treino) {
            return $http.put($rootScope.URL_BASE + ResourceTreino + '/treino/', treino).then(UTIL.success, UTIL.error);
        }
        function getTreinoById(id) {
            return $http.get($rootScope.URL_BASE + ResourceTreino + '/treino/' + id).then(UTIL.success, UTIL.error);
        }
        function listTreinoByTurmaByAluno(id, ra) {
            return $http.get($rootScope.URL_BASE + ResourceTreino + '/turma/' + id + '/aluno/' + ra + '/treino').then(UTIL.success, UTIL.error);
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        function getRankingTurmaByProfessor(matricula) {
            return $http.get($rootScope.URL_BASE + ResourceRanking + '/professor/' + matricula + '/turma/ranking').then(UTIL.success, UTIL.error);
        }
        function getRankingTurmaByAluno(ra) {
            return $http.get($rootScope.URL_BASE + ResourceRanking + '/aluno/' + ra + '/turma/ranking').then(UTIL.success, UTIL.error);
        }
        function getRankingAlunoByTurma(id) {
            return $http.get($rootScope.URL_BASE + ResourceRanking + '/turma/' + id + '/aluno/ranking').then(UTIL.success, UTIL.error);
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        function getDesempenhoByTurmaByProfessor(id) {
            return $http.get($rootScope.URL_BASE + ResourceDesempenho + '/turma/' + id + '/desempenho').then(UTIL.success, UTIL.error);
        }
        function getDesempenhoByTurmaByAluno(id, ra) {
            return $http.get($rootScope.URL_BASE + ResourceDesempenho + '/turma/' + id + '/aluno/' + ra + '/desempenho').then(UTIL.success, UTIL.error);
        }
        function getTemaCriticoByPublicacao(id) {
            return $http.get($rootScope.URL_BASE + ResourceDesempenho + '/publicacao/' + id + '/temaCritico').then(UTIL.success, UTIL.error);
        }
        function getTemaCriticoByPublicacaoByAluno(id, ra) {
            return $http.get($rootScope.URL_BASE + ResourceDesempenho + '/publicacao/' + id + '/aluno/' + ra + '/temaCritico').then(UTIL.success, UTIL.error);
        }
        function listQuestaoCriticaByPublicacaoByTemaCritico(publicacao_id, tema_id) {
            return $http.get($rootScope.URL_BASE + ResourceDesempenho + '/publicacao/' + publicacao_id + '/temaCritico/' + tema_id + '/questao').then(UTIL.success, UTIL.error);
        }
        function listQuestaoCriticaByPublicacaoByAlunoByTemaCritico(publicacao_id, ra, tema_id) {
            return $http.get($rootScope.URL_BASE + ResourceDesempenho + '/publicacao/' + publicacao_id + '/aluno/' + ra + '/temaCritico/' + tema_id + '/questao').then(UTIL.success, UTIL.error);
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////
    }
})();
