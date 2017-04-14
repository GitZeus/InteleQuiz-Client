/* global angular */
(function () {
    'use strict';
    angular
            .module('intelequiz')
            .controller('manterQuestaoCtrl', manterQuestaoCtrl);
    manterQuestaoCtrl.$inject = ['DADOS_GLOBAIS', 'CLASSES', 'questaoSrvc', 'questaoDados', '$state', '$ionicPopup'];
    function manterQuestaoCtrl(DADOS_GLOBAIS, CLASSES, questaoSrvc, questaoDados, $state, $ionicPopup) {
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

            if (DADOS_GLOBAIS.STATUS_QUIZ_QUESTAO && DADOS_GLOBAIS.STATUS_QUIZ_QUESTAO.length > 0) {
                manterQuestaoCtrl.listStatusQuizQuestao = DADOS_GLOBAIS.STATUS_QUIZ_QUESTAO;
            } else {
                questaoSrvc.listStatusQuizQuestao().then(function (response) {
                    if (response.data) {
                        DADOS_GLOBAIS.STATUS_QUIZ_QUESTAO = response.data;
                        manterQuestaoCtrl.listStatusQuizQuestao = DADOS_GLOBAIS.STATUS_QUIZ_QUESTAO;
                    }
                });
            }
        }

        manterQuestaoCtrl.salvarQuestao = function () {
            var status = 0;

            angular.forEach(manterQuestaoCtrl.listStatusQuizQuestao, function (value) {
                if (value == 'CADASTRADO')
                    status = value;
            })

            var questao = new CLASSES.Questao(); 
//                    {
//                tipo: manterQuestaoCtrl.filtroTipoQuestao,
//                nivel: manterQuestaoCtrl.filtroNivelQuestao,
//                texto: manterQuestaoCtrl.textoQuestao,
//                status: status
//            }
            console.log(questao);
            questaoSrvc.saveQuestao(questao).then(function (response) {
                if (response.data) {
                    if (response.data == true) {
                        $ionicPopup.alert({
                            title: 'Atenção',
                            template: 'Questão inserida com sucesso', //response.message.text,
                            buttons: [{
                                    text: '<b>Fechar</b>',
                                    type: 'button-assertive',
                                    onTap: function () {
                                        $state.go('menu.questoes', {}, {reload: true});
                                    }
                                }],
                        });
                    }
                }
            });

        }
    }
})();