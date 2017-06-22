(function () {
    'use strict';

    angular
        .module('intelequiz')
        .controller('manterTreinoCtrl', manterTreinoCtrl)

    manterTreinoCtrl.$inject = ['DADOS', 'UTIL', 'SERVICE', 'CLASSES', '$scope', '$state', '$timeout', 'ionicMaterialMotion'];

    function manterTreinoCtrl(DADOS, UTIL, SERVICE, CLASSES, $scope, $state, $timeout, ionicMaterialMotion) {
        var manterTreinoCtrl = this;

        init();

        function init() {
            UTIL.displayMaterialInk();

            manterTreinoCtrl.init = init;
            manterTreinoCtrl.usuarioLogado = UTIL.localStorage.get('obj_usuario_logado');
            manterTreinoCtrl.questaoExibida = {};
            manterTreinoCtrl.respostaEscolhida = null;
            manterTreinoCtrl.countQuestoes = {};

            manterTreinoCtrl.escolherResposta = escolherResposta;
            manterTreinoCtrl.responderQuestao = responderQuestao;
            manterTreinoCtrl.pularQuestao = pularQuestao;
            manterTreinoCtrl.isResultadoFinal = false;

            checkIsAddOrEdit();

            $scope.$broadcast('scroll.refreshComplete');
        }

        function checkIsAddOrEdit() {
            if ($state.params.acao === 'comecar') {
                manterTreinoCtrl.publicacao = $state.params.publicacao;
                manterTreinoCtrl.treino = new CLASSES.Treino();
                saveTreino(manterTreinoCtrl.usuarioLogado, manterTreinoCtrl.publicacao);
            } else if ($state.params.acao === 'continuar') {
                manterTreinoCtrl.treino = $state.params.treino;
                manterTreinoCtrl.publicacao = manterTreinoCtrl.treino.publicacao;
                listQuestaoContinuacaoByTreino(manterTreinoCtrl.treino);
            } else if ($state.params.acao === 'revisar') {

            }
        }

        function saveTreino(aluno, publicacao) {
            if (aluno && aluno.ra && publicacao && publicacao.id) {
                SERVICE.saveTreino(aluno.ra, publicacao.id).then(function (response) {
                    if (response && response.data) {
                        manterTreinoCtrl.treino = response.data;
                        listQuestaoByQuiz(publicacao.quiz);
                    }
                });
            }
        }

        function listQuestaoByQuiz(quiz) {
            if (quiz && quiz.id) {
                SERVICE.listQuestaoByQuiz(quiz.id).then(function (response) {
                    if (response && response.data) {
                        manterTreinoCtrl.publicacao.quiz.questoes = response.data;
                        manterTreinoCtrl.countQuestoes.total = manterTreinoCtrl.publicacao.quiz.questoes.length;
                        configExibicaoQuestao();
                    }
                });
            }
        }

        function listQuestaoContinuacaoByTreino(treino) {
            if (treino && treino.id) {
                SERVICE.listQuestaoContinuacaoByTreino(treino.id).then(function (response) {
                    if (response && response.data) {
                        manterTreinoCtrl.publicacao.quiz.questoes = response.data;
                        manterTreinoCtrl.countQuestoes.total = manterTreinoCtrl.publicacao.quiz.questoes.length;
                        configExibicaoQuestao();
                    }
                });
            }
        }

        function configExibicaoQuestao() {
            if (manterTreinoCtrl.publicacao.quiz.questoes && manterTreinoCtrl.publicacao.quiz.questoes.length > 0) {
                manterTreinoCtrl.questaoExibida = manterTreinoCtrl.publicacao.quiz.questoes[0];
                manterTreinoCtrl.countQuestoes.atual ? manterTreinoCtrl.countQuestoes.atual++ : manterTreinoCtrl.countQuestoes.atual = 1;
                manterTreinoCtrl.respostaEscolhida = null;
                if (manterTreinoCtrl.questaoExibida.nivel == 'Médio') {
                    manterTreinoCtrl.countdown = 15;
                } else if (manterTreinoCtrl.questaoExibida.nivel == 'Dificil') {
                    manterTreinoCtrl.countdown = 20;
                } else {
                    manterTreinoCtrl.countdown = 10;
                }
                resetTimer();
                startTimer();

                $timeout(function () {
                    ionicMaterialMotion.blinds({
                        startVelocity: 1000
                    });
                });
            }
        }

        function responderQuestao() {
            $scope.$broadcast('timer-stop');
            $scope.timerRunning = false;
            var gabarito = {
                questao_id: manterTreinoCtrl.questaoExibida.id,
                treino_id: manterTreinoCtrl.treino.id,
                resposta_id: manterTreinoCtrl.respostaEscolhida.id,
            }
            SERVICE.updateTreino(gabarito).then(function (response) {
                if (response && response.data) {
                    manterTreinoCtrl.treino = response.data;
                    if (manterTreinoCtrl.publicacao.quiz.questoes && manterTreinoCtrl.publicacao.quiz.questoes.length > 0) {
                        manterTreinoCtrl.publicacao.quiz.questoes.splice(0, 1);
                        configExibicaoQuestao();
                        getResultadoFinal();
                    }
                }
            });
        }

        function getResultadoFinal() {
            if (manterTreinoCtrl.publicacao.quiz.questoes && manterTreinoCtrl.publicacao.quiz.questoes.length == 0) {
                SERVICE.getTreinoById(manterTreinoCtrl.treino.id).then(function (response) {
                    if (response && response.data) {
                        manterTreinoCtrl.isResultadoFinal = true;
                        manterTreinoCtrl.resultadoFinal = response.data;
                    }
                });
            }
        }

        function escolherResposta(resposta) {
            manterTreinoCtrl.respostaEscolhida = resposta;
        }

        function pularQuestao() {
            manterTreinoCtrl.publicacao.quiz.questoes.splice(0, 1);
            configExibicaoQuestao();
            getResultadoFinal();
        }

        function startTimer() {
            $scope.$broadcast('timer-start');
            $scope.timerRunning = true;
        };

        function resetTimer() {
            $scope.$broadcast('timer-set-countdown', manterTreinoCtrl.countdown + 1);
            $scope.timerRunning = false;
        };
    }
})();
