/* global angular */
(function () {
    'use strict';
    angular
        .module('intelequiz')
        .controller('manterQuestaoCtrl', manterQuestaoCtrl);

    manterQuestaoCtrl.$inject = ['DADOS', 'UTIL', 'SERVICE', 'CLASSES', '$state'];

    function manterQuestaoCtrl(DADOS, UTIL, SERVICE, CLASSES, $state) {
        var manterQuestaoCtrl = this;

        init();

        function init() {
            UTIL.displayMaterialInk();

            manterQuestaoCtrl.usuarioLogado = UTIL.localStorage.get('obj_usuario_logado');
            manterQuestaoCtrl.listTemasByDisciplinaByProfessor = listTemasByDisciplinaByProfessor;
            manterQuestaoCtrl.selecionarRespostaCerta = selecionarRespostaCerta;
            manterQuestaoCtrl.salvarQuestao = salvarQuestao;

            manterQuestaoCtrl.functionCount = 0;
            listDisciplinaByProfessor(manterQuestaoCtrl.usuarioLogado);
            listTipoQuestao();
            listNivelQuestao();
        }

        function listDisciplinaByProfessor(professor) {
            if (professor) {
                if (DADOS.arr_disciplina && DADOS.arr_disciplina.length > 0) {
                    _montarDisciplinas(DADOS.arr_disciplina);
                } else {
                    SERVICE.listDisciplinaByProfessor(professor.matricula).then(function (response) {
                        DADOS.arr_disciplina = response.data;
                        _montarDisciplinas(DADOS.arr_disciplina);
                    });
                }
            }
        }

        function _montarDisciplinas(array) {
            if (array && array.length > 0) {
                manterQuestaoCtrl.arrayDisciplinas = array;
                checkIsAddOrEdit();
            }
        }

        function listTipoQuestao() {
            if (DADOS.arr_tipo_questao && DADOS.arr_tipo_questao.length > 0) {
                _montarTipoQuestao(DADOS.arr_tipo_questao);
            } else {
                SERVICE.listTipoQuestao().then(function (response) {
                    if (response.data) {
                        DADOS.arr_tipo_questao = response.data;
                        _montarTipoQuestao(DADOS.arr_tipo_questao);
                    }
                });
            }
        }

        function _montarTipoQuestao(array) {
            if (array && array.length > 0) {
                manterQuestaoCtrl.arrayTiposQuestao = array;
                checkIsAddOrEdit();
            }
        }

        function listNivelQuestao() {
            if (DADOS.arr_nivel_questao && DADOS.arr_nivel_questao.length > 0) {
                _montarNivelQuestao(DADOS.arr_nivel_questao);
            } else {
                SERVICE.listNivelQuestao().then(function (response) {
                    if (response.data) {
                        DADOS.arr_nivel_questao = response.data;
                        _montarNivelQuestao(DADOS.arr_nivel_questao);
                    }
                });
            }
        }

        function _montarNivelQuestao(array) {
            if (array && array.length > 0) {
                manterQuestaoCtrl.arrayNiveisQuestao = array;
                checkIsAddOrEdit();
            }
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
            if (manterQuestaoCtrl.functionCount === 3) {
                console.log($state.params.questao);
                if ($state.params.questao) {
                    manterQuestaoCtrl.questao = $state.params.questao;
                    manterQuestaoCtrl.filtroDisciplina = manterQuestaoCtrl.questao.temas[0].disciplina;
                    listTemasByDisciplinaByProfessor(manterQuestaoCtrl.filtroDisciplina);
                    listTemaByQuestao(manterQuestaoCtrl.questao);
                } else {
                    manterQuestaoCtrl.questao = new CLASSES.Questao();
                    manterQuestaoCtrl.questao.tipo = manterQuestaoCtrl.arrayTiposQuestao[0];
                    manterQuestaoCtrl.questao.nivel = manterQuestaoCtrl.arrayNiveisQuestao[0];
                    manterQuestaoCtrl.questao.respostas = getTemplateRespostas();
                    manterQuestaoCtrl.filtroDisciplina = manterQuestaoCtrl.arrayDisciplinas[0];
                    listTemasByDisciplinaByProfessor(manterQuestaoCtrl.filtroDisciplina);
                }
            }
        }

        function getTemplateRespostas() {
            var respostasTpl = [];
            if (manterQuestaoCtrl.questao.tipo === 'Verdadeiro ou Falso') {
                respostasTpl = [{ texto: "Verdadeiro", certa: true }, { texto: "Falso", certa: false }];
            } else {
                respostasTpl = [{ texto: "", certa: false }, { texto: "", certa: false }, { texto: "", certa: false }, { texto: "", certa: false }];
            }
            return respostasTpl;
        }

        function listTemaByQuestao(questao) {
            SERVICE.listTemaByQuestao(questao.id).then(function (response) {
                if (response.data) {
                    manterQuestaoCtrl.questao.temas = response.data;
                    for (var i = 0; i < manterQuestaoCtrl.questao.temas.length; i++) {
                        for (var j = 0; j < manterQuestaoCtrl.arrayTemas.length; j++) {
                            if (manterQuestaoCtrl.questao.temas[i].id === manterQuestaoCtrl.arrayTemas[j].id) {
                                manterQuestaoCtrl.arrayTemas[j].checked = true;
                            }
                        }
                    }
                }
            });
        }

        function selecionarRespostaCerta(resposta) {
            for (var i = 0; i < manterQuestaoCtrl.questao.respostas.length; i++) {
                if (manterQuestaoCtrl.questao.respostas[i].texto === resposta.texto) {
                    manterQuestaoCtrl.questao.respostas[i].certa = true;
                } else {
                    manterQuestaoCtrl.questao.respostas[i].certa = false;
                }
            }
        }

        function salvarQuestao() {
            manterQuestaoCtrl.questao.temas = [];
            for (var i = 0; i < manterQuestaoCtrl.arrayTemas.length; i++) {
                if (manterQuestaoCtrl.arrayTemas[i].checked) {
                    var tema = angular.copy(manterQuestaoCtrl.arrayTemas[i]);
                    delete tema.checked;
                    manterQuestaoCtrl.questao.temas.push(tema);
                }
            }

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
            if (!questao.texto || questao.texto.length === 0) {
                var message = {
                    type: 'warning',
                    text: 'Informe um texto para a questão'
                };
                UTIL.showToaster(message);
                return false;
            }
            if (!questao.respostas || questao.respostas.length === 0) {
                var message = {
                    type: 'warning',
                    text: 'Informe as respostas da questão'
                };
                UTIL.showToaster(message);
                return false;
            } else {
                var respostaCerta = 0;
                for (var i = 0; i < questao.respostas.length; i++) {
                    if (questao.respostas[i].certa === true) {
                        respostaCerta++;
                    }
                }
                if (respostaCerta === 0) {
                    var message = {
                        type: 'warning',
                        text: 'Marque ao menos uma resposta como certa'
                    };
                    UTIL.showToaster(message);
                    return false;
                }
            }
            if (!questao.temas || questao.temas.length === 0) {
                var message = {
                    type: 'warning',
                    text: 'Selecione ao menos um tema'
                };
                UTIL.showToaster(message);
                return false;
            }
            return true;
        }
    }
})();