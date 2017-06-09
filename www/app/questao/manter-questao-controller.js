/* global angular */
(function () {
    'use strict';
    angular
            .module('intelequiz')
            .controller('manterQuestaoCtrl', manterQuestaoCtrl);

    manterQuestaoCtrl.$inject = ['DADOS', 'SERVICE', 'CLASSES', '$state'];

    function manterQuestaoCtrl(DADOS, SERVICE, CLASSES, $state) {
        var manterQuestaoCtrl = this;

        init();

        function init() {
            SERVICE.displayMaterialInk();
            manterQuestaoCtrl.usuarioLogado = SERVICE.localStorageUtil.get('USUARIO_LOGADO');
            manterQuestaoCtrl.arrayDisciplinas = DADOS.DISCIPLINAS || [];
            manterQuestaoCtrl.filtroDisciplina = manterQuestaoCtrl.arrayDisciplinas[0];
            manterQuestaoCtrl.arrayTemas = [];

            manterQuestaoCtrl.listTemasByDisciplinaByProfessor = listTemasByDisciplinaByProfessor;
            manterQuestaoCtrl.selecionarRespostaCerta = selecionarRespostaCerta;
            manterQuestaoCtrl.salvarQuestao = salvarQuestao;

            manterQuestaoCtrl.functionCount = 0;
            listTipoQuestao();
            listNivelQuestao();
            listStatusQuizQuestao();
            listTemasByDisciplinaByProfessor(manterQuestaoCtrl.filtroDisciplina);
        }

        function listTipoQuestao() {
            SERVICE.listTipoQuestao().then(function (response) {
                if (response.data) {
                    manterQuestaoCtrl.arrayTiposQuestao = response.data;
                    checkIsAddOrEdit();
                }
            });
        }

        function listNivelQuestao() {
            SERVICE.listNivelQuestao().then(function (response) {
                if (response.data) {
                    manterQuestaoCtrl.arrayNiveisQuestao = response.data;
                    checkIsAddOrEdit();
                }
            });
        }

        function listStatusQuizQuestao() {
            SERVICE.listStatusQuizQuestao().then(function (response) {
                if (response.data) {
                    manterQuestaoCtrl.arrayStatusQuizQuestao = response.data;
                    checkIsAddOrEdit();
                }
            });
        }

        function listTemasByDisciplinaByProfessor(disciplina) {
            manterQuestaoCtrl.arrayTemas = [];
            if (disciplina && disciplina.id) {
                SERVICE.listTemasByDisciplinaByProfessor(manterQuestaoCtrl.usuarioLogado.matricula, disciplina.id).then(function (response) {
                    if (response.data) {
                        manterQuestaoCtrl.arrayTemas = response.data;
                        checkIsAddOrEdit();
                    }
                });
            }
        }

        function checkIsAddOrEdit() {
            manterQuestaoCtrl.functionCount++;
            if (manterQuestaoCtrl.functionCount === 4) {
                if ($state.params.questao) {
                    manterQuestaoCtrl.questao = $state.params.questao;
                    console.log(manterQuestaoCtrl.questao);
                    listTemaByQuestao(manterQuestaoCtrl.questao);
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

        function listTemaByQuestao(questao) {
            SERVICE.listTemaByQuestao(questao.id).then(function (response) {
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
                                $state.go('menu.questao');
                            }
                        }
                    });
                } else {
                    SERVICE.updateQuestao(manterQuestaoCtrl.questao).then(function (response) {
                        if (response && response.message) {
                            if (response.message.type !== 'error') {
                                $state.go('menu.questao');
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
                    text: 'Informe um texto para a questão'
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