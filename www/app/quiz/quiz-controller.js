/* global angular */
(function () {
    'use strict';
    angular
            .module('intelequiz')
            .controller('quizCtrl', quizCtrl);
    quizCtrl.$inject = ['DADOS', 'SERVICE', 'CLASSES', '$state'];
    function quizCtrl(DADOS, SERVICE, CLASSES, $state) {
        var quizCtrl = this;

        init();

        function init() {
            quizCtrl.usuarioLogado = DADOS.USUARIO_LOGADO;
            quizCtrl.arrayDisciplinas = [];
            
            listDisciplinasByProfessor();
        }
        
        function listDisciplinasByProfessor() {
            SERVICE.listDisciplinasByProfessor(quizCtrl.usuarioLogado).then(function (response) {
                if (response.data) {
                    DADOS.DISCIPLINAS = response.data;
                    quizCtrl.arrayDisciplinas = DADOS.DISCIPLINAS;
                    quizCtrl.filtroDisciplina = quizCtrl.arrayDisciplinas[0] ? quizCtrl.arrayDisciplinas[0] : {};
                }
            });
        }
    }
})();