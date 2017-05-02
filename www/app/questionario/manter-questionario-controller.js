/* global angular */
(function () {
    'use strict';
    angular
        .module('intelequiz')
        .controller('manterQuestionarioCtrl', manterQuestionarioCtrl);
    manterQuestionarioCtrl.$inject = ['DADOS', 'SERVICE', 'CLASSES', '$state'];
    function manterQuestionarioCtrl(DADOS, SERVICE, CLASSES, $state) {
        var manterQuestionarioCtrl = this;

        init();

        function init() {
            manterQuestionarioCtrl.usuarioLogado = DADOS.USUARIO_LOGADO;
            manterQuestionarioCtrl.arrayDisciplinas = [];
            manterQuestionarioCtrl.filtroDisciplina = new CLASSES.Disciplina();
            manterQuestionarioCtrl.arrayTemas = [];
            manterQuestionarioCtrl.filtroTema = new CLASSES.Tema();
            manterQuestionarioCtrl.filtroNivel = new CLASSES.Questao();
            manterQuestionarioCtrl.filtroTextoQuestao = "";
            manterQuestionarioCtrl.arrayQuestoes = [];
            manterQuestionarioCtrl.arrayQuestoesSelecionadas = [];

            manterQuestionarioCtrl.listTemasByDisciplina = listTemasByDisciplina;
            manterQuestionarioCtrl.listQuestoesByTema = listQuestoesByTema;
            manterQuestionarioCtrl.selecionarQuestao = selecionarQuestao;
            manterQuestionarioCtrl.salvarQuestionario = salvarQuestionario;
            manterQuestionarioCtrl.removerQuestaoSelecionada = removerQuestaoSelecionada;

            manterQuestionarioCtrl.functionCount = 0;
            listDisciplinasByProfessor();
            listNiveisQuestao();
        }

        function listDisciplinasByProfessor() {
            if (DADOS.DISCIPLINAS && DADOS.DISCIPLINAS.length > 0) {
                manterQuestionarioCtrl.arrayDisciplinas = DADOS.DISCIPLINAS || {};
                manterQuestionarioCtrl.filtroDisciplina = manterQuestionarioCtrl.arrayDisciplinas[0] ? manterQuestionarioCtrl.arrayDisciplinas[0] : {};
                listTemasByDisciplina(manterQuestionarioCtrl.filtroDisciplina);
                checkIsAddOrEdit();
            } else {
                SERVICE.listDisciplinasByProfessor(manterQuestionarioCtrl.usuarioLogado).then(function (response) {
                    if (response.data) {
                        DADOS.DISCIPLINAS = response.data;
                        manterQuestionarioCtrl.arrayDisciplinas = DADOS.DISCIPLINAS;
                        manterQuestionarioCtrl.filtroDisciplina = manterQuestionarioCtrl.arrayDisciplinas[0] ? manterQuestionarioCtrl.arrayDisciplinas[0] : {};
                        listTemasByDisciplina(manterQuestionarioCtrl.filtroDisciplina);
                        checkIsAddOrEdit();
                    }
                });
            }
        }

        function listTemasByDisciplina(disciplina) {
            SERVICE.listTemasByDisciplina(manterQuestionarioCtrl.usuarioLogado.matricula, disciplina.id).then(function (response) {
                if (response.data) {
                    manterQuestionarioCtrl.arrayTemas = response.data;
                    manterQuestionarioCtrl.filtroTema = manterQuestionarioCtrl.arrayTemas[0] ? manterQuestionarioCtrl.arrayTemas[0] : {};
                    listQuestoesByTema(manterQuestionarioCtrl.filtroTema);
                    checkIsAddOrEdit();
                }
            });
        }

        function listQuestoesByTema(tema) {
            if (tema && tema.id) {
                SERVICE.listQuestoesByTema(tema.id).then(function (response) {
                    if (response.data) {
                        manterQuestionarioCtrl.arrayQuestoes = response.data;
                        checkQuestoesDisponiveis();
                        checkIsAddOrEdit();
                    }
                });
            } else {
                var message = {
                    type: 'error',
                    text: 'Falha ao recuperar o id do tema'
                }
                SERVICE.showToaster(message);
                return;
            }
        }

        function listNiveisQuestao() {
            if (DADOS.NIVEIS_QUESTAO && DADOS.NIVEIS_QUESTAO.length > 0) {
                manterQuestionarioCtrl.arrayNiveisQuestao = DADOS.NIVEIS_QUESTAO || {};
                manterQuestionarioCtrl.filtroNivel = manterQuestionarioCtrl.arrayNiveisQuestao[0] ? manterQuestionarioCtrl.arrayNiveisQuestao[0] : {};
                checkIsAddOrEdit();
            } else {
                SERVICE.listNiveisQuestao().then(function (response) {
                    if (response.data) {
                        DADOS.NIVEIS_QUESTAO = response.data;
                        manterQuestionarioCtrl.arrayNiveisQuestao = DADOS.NIVEIS_QUESTAO;
                        manterQuestionarioCtrl.filtroNivel = manterQuestionarioCtrl.arrayNiveisQuestao[0] ? manterQuestionarioCtrl.arrayNiveisQuestao[0] : {};
                        checkIsAddOrEdit();
                    }
                });
            }
        }

        function checkIsAddOrEdit() {
            manterQuestionarioCtrl.functionCount++;
            if (manterQuestionarioCtrl.functionCount === 4) {
                if ($state.params.questionario) {
                    manterQuestionarioCtrl.questionario = $state.params.questionario;
                    console.log(manterQuestionarioCtrl.questionario);
                    console.log(manterQuestionarioCtrl.arrayDisciplinas);
                    listQuestoesByQuestionario(manterQuestionarioCtrl.questionario);
                } else {
                    manterQuestionarioCtrl.questionario = new CLASSES.Questionario();
                    manterQuestionarioCtrl.questionario.disciplina = manterQuestionarioCtrl.arrayDisciplinas[0];
                }
            }
        }

        function listQuestoesByQuestionario(questionario) {
            if (!questionario.id) {
                var message = {
                    type: 'error',
                    text: 'Falha ao recuperar o id do questionario'
                }
                SERVICE.showToaster(message);
                return;
            }
            SERVICE.listQuestoesByQuestionario(questionario.id).then(function (response) {
                if (response && response.data) {
                    manterQuestionarioCtrl.questionario.questoes = response.data;
                    checkQuestoesDisponiveis();
                }
            })
        }

        function checkQuestoesDisponiveis() {
            if (manterQuestionarioCtrl.questionario && manterQuestionarioCtrl.questionario.questoes) {
                angular.forEach(manterQuestionarioCtrl.questionario.questoes, function (selecionada) {
                    angular.forEach(manterQuestionarioCtrl.arrayQuestoes, function (disponivel) {
                        if (disponivel.id === selecionada.id) {
                            disponivel.checked = true;
                        }
                    });
                });
            }
        }

        function selecionarQuestao(questao) {
            var questaoJaIncluida = false;
            angular.forEach(manterQuestionarioCtrl.questionario.questoes, function (value, index) {
                if (value.id === questao.id) {
                    questaoJaIncluida = true;
                    if (questao.checked === false) {
                        manterQuestionarioCtrl.questionario.questoes.splice(index, 1);
                    }
                }
            });
            if (questao.checked === true && questaoJaIncluida === false) {
                manterQuestionarioCtrl.questionario.questoes.push(questao);
            }
        }

        function removerQuestaoSelecionada(questao, indice) {
            manterQuestionarioCtrl.questionario.questoes.splice(indice, 1);
            angular.forEach(manterQuestionarioCtrl.arrayQuestoes, function (disponivel) {
                if (disponivel.id === questao.id) {
                    disponivel.checked = false;
                }
            });
        }

        function salvarQuestionario() {

            angular.forEach(manterQuestionarioCtrl.questionario.questoes, function (value) {
                delete value.checked;
            })

            manterQuestionarioCtrl.questionario.professor = manterQuestionarioCtrl.usuarioLogado;

            if (validarQuestionario(manterQuestionarioCtrl.questionario)) {
                console.log("QUESTIONARIO: ", manterQuestionarioCtrl.questionario);
                if(!manterQuestionarioCtrl.questionario.id){
                    SERVICE.saveQuestionario(manterQuestionarioCtrl.questionario).then(function (response) {
                        if (response && response.message) {
                            if (response.message.type !== 'error') {
                                $state.go('menu.questionario');
                            }
                        }
                    })
                }else{
                    SERVICE.updateQuestionario(manterQuestionarioCtrl.questionario).then(function (response) {
                        if (response && response.message) {
                            if (response.message.type !== 'error') {
                                $state.go('menu.questionario');
                            }
                        }
                    })
                }
            }
        }

        function validarQuestionario(questionario) {
            if (!questionario.professor || !questionario.professor.matricula) {
                var message = {
                    type: 'warning',
                    text: 'Falha ao obter o usuário logado'
                };
                SERVICE.showToaster(message);
                return false;
            }
            if (!questionario.disciplina || questionario.disciplina == {}) {
                var message = {
                    type: 'warning',
                    text: 'Selecione uma disciplina para o questionário'
                };
                SERVICE.showToaster(message);
                return false;
            }
            if (!questionario.questoes || questionario.questoes.length == 0) {
                var message = {
                    type: 'warning',
                    text: 'Selecione ao menos uma questão para o questionário'
                };
                SERVICE.showToaster(message);
                return false;
            }
            if (!questionario.descricao || questionario.descricao.length == 0) {
                var message = {
                    type: 'warning',
                    text: 'Digite uma descrição para o questionário'
                };
                SERVICE.showToaster(message);
                return false;
            }
            return true;
        }

    }
})();