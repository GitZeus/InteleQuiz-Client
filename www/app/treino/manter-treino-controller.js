(function () {
    'use strict';

    angular
            .module('intelequiz')
            .controller('manterTreinoCtrl', manterTreinoCtrl)

    manterTreinoCtrl.$inject = ['DADOS', 'SERVICE', 'CLASSES', '$scope', '$state', '$timeout', 'ionicMaterialMotion'];

    function manterTreinoCtrl(DADOS, SERVICE, CLASSES, $scope, $state, $timeout, ionicMaterialMotion) {
        var manterTreinoCtrl = this;

        init();

        function init() {
            SERVICE.displayMaterialInk();

            manterTreinoCtrl.init = init;
            manterTreinoCtrl.usuarioLogado = SERVICE.localStorageUtil.get('USUARIO_LOGADO');
            manterTreinoCtrl.questaoExibida = {};
            manterTreinoCtrl.publicacao = $state.params.publicacao;
            manterTreinoCtrl.treino = new CLASSES.Treino();
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
            if ($state.params.novoTreino === true) {
                saveTreino(manterTreinoCtrl.usuarioLogado, manterTreinoCtrl.publicacao);
                ;
            } else {
                // continueTreino();
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

        function configExibicaoQuestao() {
            if (manterTreinoCtrl.publicacao.quiz.questoes && manterTreinoCtrl.publicacao.quiz.questoes.length > 0) {
                manterTreinoCtrl.questaoExibida = manterTreinoCtrl.publicacao.quiz.questoes[0];
                manterTreinoCtrl.countQuestoes.atual ? manterTreinoCtrl.countQuestoes.atual++ : manterTreinoCtrl.countQuestoes.atual = 1;
                manterTreinoCtrl.respostaEscolhida = null;

                $scope.tempo = 10;
                $scope.startTimer();

                $timeout(function () {
                    ionicMaterialMotion.blinds({
                        startVelocity: 1000
                    });
                });
            }
        }

        function responderQuestao() {
            if (!manterTreinoCtrl.treino.respostas) {
                manterTreinoCtrl.treino.respostas = [];
            }
            manterTreinoCtrl.treino.respostas.push(manterTreinoCtrl.respostaEscolhida);
            SERVICE.updateTreino(manterTreinoCtrl.treino).then(function (response) {
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
        }

        $scope.startTimer = function () {
            $scope.$broadcast('timer-start');
            $scope.timerRunning = true;
        };

        $scope.resetTimer = function () {
            $scope.$broadcast('timer-reset');
            $scope.timerRunning = false;
        };
    }
})();
