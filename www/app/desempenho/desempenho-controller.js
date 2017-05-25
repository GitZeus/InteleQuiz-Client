(function () {
    'use strict';
    angular.module('intelequiz')
        .controller('desempenhoCtrl', desempenhoCtrl);

    desempenhoCtrl.$inject = ['DADOS', 'SERVICE', 'CLASSES', '$scope', '$state', '$timeout', 'ionicMaterialMotion'];

    function desempenhoCtrl(DADOS, SERVICE, CLASSES, $scope, $state, $timeout, ionicMaterialMotion) {
        var desempenhoCtrl = this;

        init();

        function init() {
            SERVICE.ionicMaterialInk();

            desempenhoCtrl.init = init;
            desempenhoCtrl.usuarioLogado = DADOS.USUARIO_LOGADO;
            desempenhoCtrl.getDesempenhoByTurma = getDesempenhoByTurma;

            listTurmasByProfessor(desempenhoCtrl.usuarioLogado);

            $scope.$broadcast('scroll.refreshComplete');
        }

        function listTurmasByProfessor(professor) {
            if (professor && professor.matricula) {
                SERVICE.listTurmasByProfessor(professor.matricula).then(function (response) {
                    if (response && response.data && response.data.length > 0) {
                        desempenhoCtrl.arrayTurma = response.data;
                        desempenhoCtrl.filtroTurma = desempenhoCtrl.arrayTurma[0];
                        getDesempenhoByTurma(desempenhoCtrl.filtroTurma);
                    }
                });
            }
        }

        function getDesempenhoByTurma(turma) {
            if (turma && turma.id) {
                SERVICE.getDesempenhoByTurma(turma.id).then(function (response) {
                    if (response && response.data) {
                        desempenhoCtrl.desempenho = response.data;
                        configGraficos(desempenhoCtrl.desempenho);
                    }
                });
            }
        }

        function configGraficos(desempenho) {
            desempenhoCtrl.graficoDesempenho = {};
            desempenhoCtrl.graficoDesempenho.data = [desempenho.aproveitamentos, desempenho.envolvimentos];
            desempenhoCtrl.graficoDesempenho.labels = desempenho.encerramentos;
            desempenhoCtrl.graficoDesempenho.series = ['Aproveitamento', 'Envolvimento'];
            desempenhoCtrl.graficoDesempenho.click = function (points, evt) {
                if (points && points.length > 0) {
                    var indice = points[0]._index;
                    getTemaAtencaoByQuizPublicado(desempenhoCtrl.desempenho.publicacoes[indice]);
                }
            };

            desempenhoCtrl.graficoMedia = {};
            desempenhoCtrl.graficoMedia.labels = ['Média Geral'];
            desempenhoCtrl.graficoMedia.series = ['Aproveitamento', 'Envolvimento'];
            desempenhoCtrl.graficoMedia.data = [[desempenho.medAproveitamento], [desempenho.medEnvolvimento]];
        }

        function getTemaAtencaoByQuizPublicado(quizPublicado) {
            if (quizPublicado && quizPublicado.id) {
                SERVICE.getTemaAtencaoByQuizPublicado(quizPublicado.id).then(function (response) {
                    if (response && response.data) {
                        desempenhoCtrl.graficoTemaAtencao = {};
                        desempenhoCtrl.graficoTemaAtencao.labels = ['Acertos', 'Erros'];
                        desempenhoCtrl.graficoTemaAtencao.data = [100 - response.data.percentErros,response.data.percentErros];
                    }
                });
            }
        }
    }
})();