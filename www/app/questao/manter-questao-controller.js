/* global angular */
(function () {
    'use strict';
    angular
            .module('intelequiz')
            .controller('manterQuestaoCtrl', manterQuestaoCtrl);
    manterQuestaoCtrl.$inject = ['DADOS', 'SERVICE', 'CLASSES', '$state'];
    function manterQuestaoCtrl(DADOS, SERVICE, CLASSES, $state) {
        var manterQuestaoCtrl = this;

        manterQuestaoCtrl.usuarioLogado = DADOS.USUARIO_LOGADO;

        init();

        function init() {
            manterQuestaoCtrl.arrayDisciplinas = DADOS.DISCIPLINAS || [];
            manterQuestaoCtrl.filtroDisciplina = manterQuestaoCtrl.arrayDisciplinas[0];
            manterQuestaoCtrl.arrayTemas = DADOS.TEMAS || [];

            manterQuestaoCtrl.listTemasByDisciplina = listTemasByDisciplina;
            manterQuestaoCtrl.selecionarRespostaCerta = selecionarRespostaCerta;
            manterQuestaoCtrl.salvarQuestao = salvarQuestao;

            manterQuestaoCtrl.functionCount = 0;
            listTiposQuestao();
            listNiveisQuestao();
            listStatusQuizQuestao();
        }

        function listTiposQuestao() {
            if (DADOS.TIPOS_QUESTAO && DADOS.TIPOS_QUESTAO.length > 0) {
                manterQuestaoCtrl.arrayTiposQuestao = DADOS.TIPOS_QUESTAO;
                checkIsAddOrEdit();
            } else {
                SERVICE.listTiposQuestao().then(function (response) {
                    if (response.data) {
                        DADOS.TIPOS_QUESTAO = response.data;
                        manterQuestaoCtrl.arrayTiposQuestao = DADOS.TIPOS_QUESTAO;
                        checkIsAddOrEdit();
                    }
                });
            }
        }

        function listNiveisQuestao() {
            if (DADOS.NIVEIS_QUESTAO && DADOS.NIVEIS_QUESTAO.length > 0) {
                manterQuestaoCtrl.arrayNiveisQuestao = DADOS.NIVEIS_QUESTAO;
                checkIsAddOrEdit();
            } else {
                SERVICE.listNiveisQuestao().then(function (response) {
                    if (response.data) {
                        DADOS.NIVEIS_QUESTAO = response.data;
                        manterQuestaoCtrl.arrayNiveisQuestao = DADOS.NIVEIS_QUESTAO;
                        checkIsAddOrEdit();
                    }
                });
            }
        }

        function listStatusQuizQuestao() {
            if (DADOS.STATUS_QUIZ_QUESTAO && DADOS.STATUS_QUIZ_QUESTAO.length > 0) {
                manterQuestaoCtrl.arrayStatusQuizQuestao = DADOS.STATUS_QUIZ_QUESTAO;
                checkIsAddOrEdit();
            } else {
                SERVICE.listStatusQuizQuestao().then(function (response) {
                    if (response.data) {
                        DADOS.STATUS_QUIZ_QUESTAO = response.data;
                        manterQuestaoCtrl.arrayStatusQuizQuestao = DADOS.STATUS_QUIZ_QUESTAO;
                        checkIsAddOrEdit();
                    }
                });
            }
        }

        function checkIsAddOrEdit() {
            manterQuestaoCtrl.functionCount++;
            if (manterQuestaoCtrl.functionCount === 3) {
                if ($state.params.questao) {
                    manterQuestaoCtrl.questao = $state.params.questao;
                    console.log(manterQuestaoCtrl.questao);
                    listTemasByQuestao(manterQuestaoCtrl.questao);
                } else {
                    manterQuestaoCtrl.questao = new CLASSES.Questao();
                    manterQuestaoCtrl.questao.tipo = manterQuestaoCtrl.arrayTiposQuestao[0];
                    manterQuestaoCtrl.questao.nivel = manterQuestaoCtrl.arrayNiveisQuestao[0];
                    manterQuestaoCtrl.questao.respostas = getTemplateRespostas();
                }
            }
        }

        function getTemplateRespostas() {
            var respostasTpl = [];
            if (manterQuestaoCtrl.questao.tipo === 'VERDADEIRO_FALSO') {
                respostasTpl = [{texto: "Verdadeiro", certa: true}, {texto: "Falso", certa: false}];
            } else {
                respostasTpl = [{texto: "", certa: false}, {texto: "", certa: false}, {texto: "", certa: false}, {texto: "", certa: false}];
            }
            return respostasTpl;
        }

        function listTemasByDisciplina(disciplina) {
            manterQuestaoCtrl.arrayTemas = [];
            SERVICE.listTemasByDisciplina(manterQuestaoCtrl.usuarioLogado.matricula, disciplina.id).then(function (response) {
                if (response.data) {
                    manterQuestaoCtrl.arrayTemas = response.data;
                    SERVICE.TEMAS = manterQuestaoCtrl.arrayTemas;
                }
            });
        }

        function listTemasByQuestao(questao) {
            SERVICE.listTemasByQuestao(questao.id).then(function (response) {
                if (response.data) {
                    manterQuestaoCtrl.questao.temas = response.data;
                    angular.forEach(manterQuestaoCtrl.questao.temas, function (temaQuestao) {
                        angular.forEach(manterQuestaoCtrl.arrayTemas, function (tema) {
                            if (temaQuestao.id === tema.id) {
                                tema.checked = true;
                            }
                        });
                    });
                }
            });
        }

        function selecionarRespostaCerta(resposta) {
            angular.forEach(manterQuestaoCtrl.questao.respostas, function (value) {
                if (value.texto === resposta.texto) {
                    value.certa = true;
                } else {
                    value.certa = false;
                }
            });
        }

        function salvarQuestao() {
            manterQuestaoCtrl.questao.temas = [];
            angular.forEach(manterQuestaoCtrl.arrayTemas, function (value) {
                if (value.checked) {
                    var tema = angular.copy(value);
                    delete tema.checked;
                    manterQuestaoCtrl.questao.temas.push(tema);
                }
            });

            angular.forEach(manterQuestaoCtrl.arrayStatusQuizQuestao, function (value) {
                if (value === 'CADASTRADO')
                    manterQuestaoCtrl.questao.status = value;
            });

            if (validarQuestao(manterQuestaoCtrl.questao)) {
                if (!manterQuestaoCtrl.questao.id) {
                    SERVICE.saveQuestao(manterQuestaoCtrl.questao).then(function (response) {
                        if (response && response.message) {
                            if (response.message.type !== 'error') {
                                $state.go('menu.questoes');
                            }
                        }
                    });
                } else {
                    SERVICE.updateQuestao(manterQuestaoCtrl.questao).then(function (response) {
                        if (response && response.message) {
                            if (response.message.type !== 'error') {
                                $state.go('menu.questoes');
                            }
                        }
                    });
                }
            }
        }

        function validarQuestao(questao) {
            if (!questao.tipo || questao.tipo.length === 0) {
                var message = {
                    type: 'warning',
                    text: 'Selecione o tipo da questão'
                };
                SERVICE.showToaster(message);
                return false;
            }
            if (!questao.nivel || questao.nivel.length === 0) {
                var message = {
                    type: 'warning',
                    text: 'Selecione o nível da questão'
                };
                SERVICE.showToaster(message);
                return false;
            }
            if (!questao.texto || questao.texto.length === 0) {
                var message = {
                    type: 'warning',
                    text: 'Digite o texto da questão'
                };
                SERVICE.showToaster(message);
                return false;
            }
            if (!questao.respostas || questao.respostas.length === 0) {
                var message = {
                    type: 'warning',
                    text: 'Informe as respostas da questão'
                };
                SERVICE.showToaster(message);
                return false;
            } else {
                var respostaCerta = 0;
                angular.forEach(questao.respostas, function (value) {
                    if (value.certa === true) {
                        respostaCerta++;
                    }
                });
                if (respostaCerta === 0) {
                    var message = {
                        type: 'warning',
                        text: 'Marque ao menos uma resposta como certa'
                    };
                    SERVICE.showToaster(message);
                    return false;
                }
            }
            if (!questao.temas || questao.temas.length === 0) {
                var message = {
                    type: 'warning',
                    text: 'Selecione ao menos um tema'
                };
                SERVICE.showToaster(message);
                return false;
            }
            return true;
        }
    }
})();