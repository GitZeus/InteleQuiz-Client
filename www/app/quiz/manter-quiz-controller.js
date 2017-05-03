/* global angular */
(function () {
    'use strict';
    angular
        .module('intelequiz')
        .controller('manterQuizCtrl', manterQuizCtrl);
    manterQuizCtrl.$inject = ['DADOS', 'SERVICE', 'CLASSES', '$state'];
    function manterQuizCtrl(DADOS, SERVICE, CLASSES, $state) {
        var manterQuizCtrl = this;

        init();

        function init() {
            manterQuizCtrl.usuarioLogado = DADOS.USUARIO_LOGADO;
            manterQuizCtrl.arrayDisciplinas = [];
            manterQuizCtrl.filtroDisciplina = new CLASSES.Disciplina();
            manterQuizCtrl.arrayTemas = [];
            manterQuizCtrl.filtroTema = new CLASSES.Tema();
            manterQuizCtrl.filtroNivel = new CLASSES.Questao();
            manterQuizCtrl.filtroTextoQuestao = "";
            manterQuizCtrl.arrayQuestoes = [];
            manterQuizCtrl.arrayQuestoesSelecionadas = [];

            manterQuizCtrl.listTemasByDisciplina = listTemasByDisciplina;
            manterQuizCtrl.listQuestoesByTema = listQuestoesByTema;
            manterQuizCtrl.selecionarQuestao = selecionarQuestao;
            manterQuizCtrl.salvarQuiz = salvarQuiz;
            manterQuizCtrl.removerQuestaoSelecionada = removerQuestaoSelecionada;

            manterQuizCtrl.functionCount = 0;
            listDisciplinasByProfessor();
            listNiveisQuestao();
        }

        function listDisciplinasByProfessor() {
            if (DADOS.DISCIPLINAS && DADOS.DISCIPLINAS.length > 0) {
                manterQuizCtrl.arrayDisciplinas = DADOS.DISCIPLINAS || {};
                manterQuizCtrl.filtroDisciplina = manterQuizCtrl.arrayDisciplinas[0] ? manterQuizCtrl.arrayDisciplinas[0] : {};
                listTemasByDisciplina(manterQuizCtrl.filtroDisciplina);
                checkIsAddOrEdit();
            } else {
                SERVICE.listDisciplinasByProfessor(manterQuizCtrl.usuarioLogado).then(function (response) {
                    if (response.data) {
                        DADOS.DISCIPLINAS = response.data;
                        manterQuizCtrl.arrayDisciplinas = DADOS.DISCIPLINAS;
                        manterQuizCtrl.filtroDisciplina = manterQuizCtrl.arrayDisciplinas[0] ? manterQuizCtrl.arrayDisciplinas[0] : {};
                        listTemasByDisciplina(manterQuizCtrl.filtroDisciplina);
                        checkIsAddOrEdit();
                    }
                });
            }
        }

        function listTemasByDisciplina(disciplina) {
            SERVICE.listTemasByDisciplina(manterQuizCtrl.usuarioLogado.matricula, disciplina.id).then(function (response) {
                if (response.data) {
                    manterQuizCtrl.arrayTemas = response.data;
                    manterQuizCtrl.filtroTema = manterQuizCtrl.arrayTemas[0] ? manterQuizCtrl.arrayTemas[0] : {};
                    listQuestoesByTema(manterQuizCtrl.filtroTema);
                    checkIsAddOrEdit();
                }
            });
        }

        function listQuestoesByTema(tema) {
            if (tema && tema.id) {
                SERVICE.listQuestoesByTema(tema.id).then(function (response) {
                    if (response.data) {
                        manterQuizCtrl.arrayQuestoes = response.data;
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
                manterQuizCtrl.arrayNiveisQuestao = DADOS.NIVEIS_QUESTAO || {};
                manterQuizCtrl.filtroNivel = manterQuizCtrl.arrayNiveisQuestao[0] ? manterQuizCtrl.arrayNiveisQuestao[0] : {};
                checkIsAddOrEdit();
            } else {
                SERVICE.listNiveisQuestao().then(function (response) {
                    if (response.data) {
                        DADOS.NIVEIS_QUESTAO = response.data;
                        manterQuizCtrl.arrayNiveisQuestao = DADOS.NIVEIS_QUESTAO;
                        manterQuizCtrl.filtroNivel = manterQuizCtrl.arrayNiveisQuestao[0] ? manterQuizCtrl.arrayNiveisQuestao[0] : {};
                        checkIsAddOrEdit();
                    }
                });
            }
        }

        function checkIsAddOrEdit() {
            manterQuizCtrl.functionCount++;
            if (manterQuizCtrl.functionCount === 4) {
                if ($state.params.quiz) {
                    manterQuizCtrl.quiz = $state.params.quiz;
                    console.log(manterQuizCtrl.quiz);
                    console.log(manterQuizCtrl.arrayDisciplinas);
                    listQuestoesByQuiz(manterQuizCtrl.quiz);
                } else {
                    manterQuizCtrl.quiz = new CLASSES.Quiz();
                    manterQuizCtrl.quiz.disciplina = manterQuizCtrl.arrayDisciplinas[0];
                }
            }
        }

        function listQuestoesByQuiz(quiz) {
            if (!quiz.id) {
                var message = {
                    type: 'error',
                    text: 'Falha ao recuperar o id do quiz'
                }
                SERVICE.showToaster(message);
                return;
            }
            SERVICE.listQuestoesByQuiz(quiz.id).then(function (response) {
                if (response && response.data) {
                    manterQuizCtrl.quiz.questoes = response.data;
                    checkQuestoesDisponiveis();
                }
            })
        }

        function checkQuestoesDisponiveis() {
            if (manterQuizCtrl.quiz && manterQuizCtrl.quiz.questoes) {
                angular.forEach(manterQuizCtrl.quiz.questoes, function (selecionada) {
                    angular.forEach(manterQuizCtrl.arrayQuestoes, function (disponivel) {
                        if (disponivel.id === selecionada.id) {
                            disponivel.checked = true;
                        }
                    });
                });
            }
        }

        function selecionarQuestao(questao) {
            var questaoJaIncluida = false;
            angular.forEach(manterQuizCtrl.quiz.questoes, function (value, index) {
                if (value.id === questao.id) {
                    questaoJaIncluida = true;
                    if (questao.checked === false) {
                        manterQuizCtrl.quiz.questoes.splice(index, 1);
                    }
                }
            });
            if (questao.checked === true && questaoJaIncluida === false) {
                manterQuizCtrl.quiz.questoes.push(questao);
            }
        }

        function removerQuestaoSelecionada(questao, indice) {
            manterQuizCtrl.quiz.questoes.splice(indice, 1);
            angular.forEach(manterQuizCtrl.arrayQuestoes, function (disponivel) {
                if (disponivel.id === questao.id) {
                    disponivel.checked = false;
                }
            });
        }

        function salvarQuiz() {

            angular.forEach(manterQuizCtrl.quiz.questoes, function (value) {
                delete value.checked;
            })

            manterQuizCtrl.quiz.professor = manterQuizCtrl.usuarioLogado;

            if (validarQuiz(manterQuizCtrl.quiz)) {
                console.log("QUESTIONARIO: ", manterQuizCtrl.quiz);
                if(!manterQuizCtrl.quiz.id){
                    SERVICE.saveQuiz(manterQuizCtrl.quiz).then(function (response) {
                        if (response && response.message) {
                            if (response.message.type !== 'error') {
                                $state.go('menu.quiz');
                            }
                        }
                    })
                }else{
                    SERVICE.updateQuiz(manterQuizCtrl.quiz).then(function (response) {
                        if (response && response.message) {
                            if (response.message.type !== 'error') {
                                $state.go('menu.quiz');
                            }
                        }
                    })
                }
            }
        }

        function validarQuiz(quiz) {
            if (!quiz.professor || !quiz.professor.matricula) {
                var message = {
                    type: 'warning',
                    text: 'Falha ao obter o usuário logado'
                };
                SERVICE.showToaster(message);
                return false;
            }
            if (!quiz.disciplina || quiz.disciplina == {}) {
                var message = {
                    type: 'warning',
                    text: 'Selecione uma disciplina para o questionário'
                };
                SERVICE.showToaster(message);
                return false;
            }
            if (!quiz.questoes || quiz.questoes.length == 0) {
                var message = {
                    type: 'warning',
                    text: 'Selecione ao menos uma questão para o questionário'
                };
                SERVICE.showToaster(message);
                return false;
            }
            if (!quiz.descricao || quiz.descricao.length == 0) {
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