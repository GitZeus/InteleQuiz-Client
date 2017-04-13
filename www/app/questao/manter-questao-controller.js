/* global angular */
(function () {
    'use strict';
    angular
            .module('intelequiz')
            .controller('manterQuestaoCtrl', manterQuestaoCtrl);
    manterQuestaoCtrl.$inject = ['DADOS_GLOBAIS', 'questaoSrvc', 'questaoDados', '$state'];
    function manterQuestaoCtrl(DADOS_GLOBAIS, questaoSrvc, questaoDados, $state) {
        var manterQuestaoCtrl = this;

        manterQuestaoCtrl.usuarioLogado = DADOS_GLOBAIS.USUARIO_LOGADO;

        init();

        function init() {
            manterQuestaoCtrl.listDisciplinas = questaoDados.DISCIPLINAS;
            manterQuestaoCtrl.filtroDisciplinaQuestao = manterQuestaoCtrl.listDisciplinas[0];
            
            manterQuestaoCtrl.filtroTipoQuestao = {};
            manterQuestaoCtrl.filtroNivelQuestao = {};

            if (DADOS_GLOBAIS.TIPOS_QUESTAO && DADOS_GLOBAIS.TIPOS_QUESTAO.length > 0) {
                manterQuestaoCtrl.listTiposQuestao = DADOS_GLOBAIS.TIPOS_QUESTAO;
                manterQuestaoCtrl.filtroTipoQuestao = manterQuestaoCtrl.listTiposQuestao[0];
            } else {
                questaoSrvc.listTiposQuestao().then(function (response) {
                    if (response.data) {
                        DADOS_GLOBAIS.TIPOS_QUESTAO = response.data;
                        manterQuestaoCtrl.listTiposQuestao = DADOS_GLOBAIS.TIPOS_QUESTAO;
                        manterQuestaoCtrl.filtroTipoQuestao = manterQuestaoCtrl.listTiposQuestao[0];
                    }
                });
            }

            if (DADOS_GLOBAIS.NIVEIS_QUESTAO && DADOS_GLOBAIS.NIVEIS_QUESTAO.length > 0) {
                manterQuestaoCtrl.listNiveisQuestao = DADOS_GLOBAIS.NIVEIS_QUESTAO;
                manterQuestaoCtrl.filtroNivelQuestao = manterQuestaoCtrl.listNiveisQuestao[0];
            } else {
                questaoSrvc.listNiveisQuestao().then(function (response) {
                    if (response.data) {
                        DADOS_GLOBAIS.NIVEIS_QUESTAO = response.data;
                        manterQuestaoCtrl.listNiveisQuestao = DADOS_GLOBAIS.NIVEIS_QUESTAO;
                        manterQuestaoCtrl.filtroNivelQuestao = manterQuestaoCtrl.listNiveisQuestao[0];
                    }
                });
            }
        }



    }
})();