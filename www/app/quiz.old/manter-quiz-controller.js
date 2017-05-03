(function () {
    'use strict';

    angular
        .module('intelequiz')
        .controller('manterQuizCtrl', manterQuizCtrl)

    manterQuizCtrl.$inject = ['DADOS', 'SERVICE', 'CLASSES'];

    function manterQuizCtrl(DADOS, SERVICE, CLASSES) {
        var manterQuizCtrl = this;

        init();

        function init() {
            manterQuizCtrl.usuarioLogado = DADOS.USUARIO_LOGADO;
            manterQuizCtrl.arrayTurma = [];
            manterQuizCtrl.arrayQuiz = [];

            manterQuizCtrl.listQuizByDisciplina = listQuizByDisciplina;

            listTurmasByProfessor();
        }

        function listTurmasByProfessor() {
            SERVICE.listTurmasByProfessor(manterQuizCtrl.usuarioLogado.matricula).then(function (response) {
                if (response.data && response.data.length > 0) {
                    manterQuizCtrl.arrayTurma = response.data;
                    manterQuizCtrl.filtroTurma = manterQuizCtrl.arrayTurma[0];
                    listQuizByDisciplina(manterQuizCtrl.filtroTurma.disciplina);
                }
            });
        }

        function listQuizByDisciplina(disciplina) {
            manterQuizCtrl.arrayQuiz = [];
            SERVICE.listQuizByDisciplina(manterQuizCtrl.usuarioLogado.matricula, disciplina.id).then(function (response) {
                if (response.data) {
                    manterQuizCtrl.arrayQuiz = response.data;
                }
            });
        }
    }
})();