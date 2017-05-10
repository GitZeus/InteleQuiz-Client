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
      SERVICE.ionicMaterialInk();

      manterTreinoCtrl.init = init;
      manterTreinoCtrl.usuarioLogado = DADOS.USUARIO_LOGADO;
      manterTreinoCtrl.questaoExibida = {};
      manterTreinoCtrl.questaoExibidaIndice = 0;
      manterTreinoCtrl.turmaQuiz = $state.params.turmaQuiz;
      manterTreinoCtrl.treino = new CLASSES.Treino();

      manterTreinoCtrl.escolherResposta = escolherResposta;

      startNewTreino(manterTreinoCtrl.usuarioLogado, manterTreinoCtrl.turmaQuiz);

      $scope.$broadcast('scroll.refreshComplete');
    }

    function startNewTreino(aluno, turmaQuiz) {
      if (aluno && aluno.ra && turmaQuiz && turmaQuiz.id) {
        SERVICE.startNewTreino(aluno.ra, turmaQuiz.id).then(function (response) {
          if (response && response.data) {
            manterTreinoCtrl.treino = response.data;
            listQuestoesByQuiz(turmaQuiz.quiz);
          }
        });
      }
    }

    function listQuestoesByQuiz(quiz) {
      if (quiz && quiz.id) {
        console.log(quiz);
        SERVICE.listQuestoesByQuiz(quiz.id).then(function (response) {
          if (response && response.data) {
            manterTreinoCtrl.turmaQuiz.quiz.questoes = response.data;
            manterTreinoCtrl.questaoExibida = manterTreinoCtrl.turmaQuiz.quiz.questoes[manterTreinoCtrl.questaoExibidaIndice];
            console.log(manterTreinoCtrl.turmaQuiz.quiz.questoes);
            console.log(manterTreinoCtrl.questaoExibida);
            $timeout(function () {
              ionicMaterialMotion.blinds({
                startVelocity: 1000
              });
            });
          }
        });
      }
    }

    function escolherResposta(resposta) {
      angular.forEach(manterTreinoCtrl.questaoExibida.respostas, function (value) {
        if (value.id === resposta.id) {
          value.escolhida = true;
        } else {
          value.escolhida = false;
        }
      });
    }
  }
})();
