(function () {
    'use strict';

    angular
        .module('intelequiz')
        .controller('treinoCtrl', treinoCtrl)

    treinoCtrl.$inject = ['DADOS', 'SERVICE', 'CLASSES'];

    function treinoCtrl(DADOS, SERVICE, CLASSES) {
        var treinoCtrl = this;

        init();

        function init() {
            treinoCtrl.usuarioLogado = DADOS.USUARIO_LOGADO;
            treinoCtrl.arrayTurma = [];

            listTurmasByAluno();
            listTreinosDisponiveis();
        }

        function listTurmasByAluno() {
            SERVICE.listTurmasByAluno(treinoCtrl.usuarioLogado).then(function (response) {
                if (response.data && response.data.length > 0) {
                    treinoCtrl.arrayTurma = response.data;
                    treinoCtrl.filtroDisciplina = treinoCtrl.arrayTurma[0];
                }
            });
        }

        function listTreinosDisponiveis(){

        }
    }
})();