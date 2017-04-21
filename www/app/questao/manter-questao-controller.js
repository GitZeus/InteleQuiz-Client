/* global angular */
(function () {
    'use strict';
    angular
            .module('intelequiz')
            .controller('manterQuestaoCtrl', manterQuestaoCtrl);
    manterQuestaoCtrl.$inject = ['DADOS_GLOBAIS', 'SERVICOS_GLOBAIS', 'CLASSES', 'questaoSrvc', 'questaoDados', '$state', '$ionicPopup', '$ionicHistory'];
    function manterQuestaoCtrl(DADOS_GLOBAIS, SERVICOS_GLOBAIS, CLASSES, questaoSrvc, questaoDados, $state, $ionicPopup, $ionicHistory) {
        var manterQuestaoCtrl = this;

        manterQuestaoCtrl.usuarioLogado = DADOS_GLOBAIS.USUARIO_LOGADO;

        init();

        function init() {
            manterQuestaoCtrl.temas = questaoSrvc.TEMAS;
            manterQuestaoCtrl.temaEscolhido = manterQuestaoCtrl.temas[0].id;
            manterQuestaoCtrl.respostasVF = [{
                    texto: "Verdadeiro",
                    certa: true
                }, {
                    texto: "Falso",
                    certa: false
                }];

            if ($state.params.questao) {
                manterQuestaoCtrl.questao = $state.params.questao;
                console.log($state.params.questao);
            } else {
                manterQuestaoCtrl.questao = new CLASSES.Questao();
                manterQuestaoCtrl.questao.respostas = manterQuestaoCtrl.respostasVF;
            }

            manterQuestaoCtrl.listDisciplinas = questaoDados.DISCIPLINAS;
            manterQuestaoCtrl.filtroDisciplinaQuestao = manterQuestaoCtrl.listDisciplinas[0];

            if (DADOS_GLOBAIS.TIPOS_QUESTAO && DADOS_GLOBAIS.TIPOS_QUESTAO.length > 0) {
                manterQuestaoCtrl.listTiposQuestao = DADOS_GLOBAIS.TIPOS_QUESTAO;
                manterQuestaoCtrl.questao.tipo = manterQuestaoCtrl.listTiposQuestao[0];
            } else {
                questaoSrvc.listTiposQuestao().then(function (response) {
                    if (response.data) {
                        DADOS_GLOBAIS.TIPOS_QUESTAO = response.data;
                        manterQuestaoCtrl.listTiposQuestao = DADOS_GLOBAIS.TIPOS_QUESTAO;
                        manterQuestaoCtrl.questao.tipo = manterQuestaoCtrl.listTiposQuestao[0];
                    }
                });
            }

            if (DADOS_GLOBAIS.NIVEIS_QUESTAO && DADOS_GLOBAIS.NIVEIS_QUESTAO.length > 0) {
                manterQuestaoCtrl.listNiveisQuestao = DADOS_GLOBAIS.NIVEIS_QUESTAO;
                manterQuestaoCtrl.questao.nivel = manterQuestaoCtrl.listNiveisQuestao[0];
            } else {
                questaoSrvc.listNiveisQuestao().then(function (response) {
                    if (response.data) {
                        DADOS_GLOBAIS.NIVEIS_QUESTAO = response.data;
                        manterQuestaoCtrl.listNiveisQuestao = DADOS_GLOBAIS.NIVEIS_QUESTAO;
                        manterQuestaoCtrl.questao.nivel = manterQuestaoCtrl.listNiveisQuestao[0];
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

        manterQuestaoCtrl.selecionarRespostaCerta = function (resposta) {
            angular.forEach(manterQuestaoCtrl.questao.respostas, function (value) {
                if (value.texto == resposta.texto) {
                    value.certa = true;
                } else {
                    value.certa = false;
                }
            });
        }

        manterQuestaoCtrl.salvarQuestao = function () {

            angular.forEach(manterQuestaoCtrl.listStatusQuizQuestao, function (value) {
                if (value == 'CADASTRADO')
                    manterQuestaoCtrl.questao.status = value;
            })

            var temas = [{
                    id: 1,
                    nome: 'Programação',
                    professor: {
                        matricula: 'MA123'
                    },
                    disciplina: {
                        id: 1
                    }
                }];

            manterQuestaoCtrl.questao.temas = temas;
            console.log(manterQuestaoCtrl.questao);
            if (!manterQuestaoCtrl.questao.id) {
                questaoSrvc.saveQuestao(manterQuestaoCtrl.questao).then(function (response) {
                    if (response && response.message) {
                        SERVICOS_GLOBAIS.showToaster(response.message);
                        if (response.message.type !== 'error') {
                            $state.go('menu.questoes')//, {}, {reload: true});
                        }
                    }
                });
            } else {
                questaoSrvc.updateQuestao(manterQuestaoCtrl.questao).then(function (response) {
                    if (response && response.message) {
                        SERVICOS_GLOBAIS.showToaster(response.message);
                        if (response.message.type !== 'error') {
                            $state.go('menu.questoes')//, {}, {reload: true});
                        }
                    }
                });
            }
        }
    }
})();