/* global angular */
(function () {
    'use strict';
    angular
        .module('intelequiz')
        .controller('questionarioCtrl', questionarioCtrl);
    questionarioCtrl.$inject = ['DADOS', 'SERVICE', 'CLASSES', '$state'];
    function questionarioCtrl(DADOS, SERVICE, CLASSES, $state) {
        var questionarioCtrl = this;

        init();

        function init() {
            questionarioCtrl.usuarioLogado = DADOS.USUARIO_LOGADO;
            questionarioCtrl.arrayDisciplinas = [];
            questionarioCtrl.arrayQuestionario = [];

            questionarioCtrl.goEditQuestionario = goEditQuestionario;
            questionarioCtrl.listQuestionarioByDisciplina = listQuestionarioByDisciplina;

            listDisciplinasByProfessor();
        }

        function listDisciplinasByProfessor() {
            questionarioCtrl.arrayDisciplinas = [];
            SERVICE.listDisciplinasByProfessor(questionarioCtrl.usuarioLogado).then(function (response) {
                if (response.data) {
                    DADOS.DISCIPLINAS = response.data;
                    questionarioCtrl.arrayDisciplinas = DADOS.DISCIPLINAS;
                    questionarioCtrl.filtroDisciplina = questionarioCtrl.arrayDisciplinas[0] ? questionarioCtrl.arrayDisciplinas[0] : {};
                    listQuestionarioByDisciplina(questionarioCtrl.filtroDisciplina);
                }
            });
        }

        function listQuestionarioByDisciplina(disciplina) {
            questionarioCtrl.arrayQuestionario = [];
            SERVICE.listQuestionarioByDisciplina(questionarioCtrl.usuarioLogado.matricula, disciplina.id).then(function (response) {
                if (response.data) {
                    DADOS.QUESTIONARIO = response.data;
                    questionarioCtrl.arrayQuestionario = DADOS.QUESTIONARIO;
                }
            });
        }

        function goEditQuestionario(questionario) {
            $state.go('menu.manter-questionario', {questionario: questionario});
        }
    }
})();