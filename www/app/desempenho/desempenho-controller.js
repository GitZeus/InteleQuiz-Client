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
            desempenhoCtrl.barChart = {};
            desempenhoCtrl.lineChart = {};
            desempenhoCtrl.pieChart = {};

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
            limparGraficos();
            if (turma && turma.id) {
                SERVICE.getDesempenhoByTurma(turma.id).then(function (response) {
                    if (response && response.data) {
                        desempenhoCtrl.desempenho = response.data;
                        configGraficos();
                    }
                });
            }
        }

        function limparGraficos() {
            desempenhoCtrl.barChart.destroy ? desempenhoCtrl.barChart.destroy() : void 0;
            desempenhoCtrl.lineChart.destroy ? desempenhoCtrl.lineChart.destroy() : void 0;
            desempenhoCtrl.pieChart.destroy ? desempenhoCtrl.pieChart.destroy() : void 0;
        }

        function configGraficos() {
            configGraficoMedia();
            configGraficoAcompanhamento();
        }

        function configGraficoMedia() {
            var elemento = document.getElementById('barChart').getContext('2d');
            desempenhoCtrl.barChart = new Chart(elemento, {
                type: 'bar',
                data: {
                    labels: ['Aproveitamento', 'Envolvimento'],
                    datasets: [{
                        label: 'Média',
                        borderColor: ['#46BFBD', '#2196F3'],
                        data: [desempenhoCtrl.desempenho.medAproveitamento, desempenhoCtrl.desempenho.medEnvolvimento],
                    }]
                },
                options: {
                    scales: {
                        yAxes: [
                            {
                                id: 'y-axis-1',
                                type: 'linear',
                                display: true,
                                position: 'left',
                                ticks: {
                                    max: 100,
                                    min: 0,
                                    stepSize: 20
                                }
                            }
                        ]
                    }
                }
            });
        }

        function configGraficoAcompanhamento() {
            var elemento = document.getElementById('lineChart').getContext('2d');
            desempenhoCtrl.lineChart = new Chart(elemento, {
                type: 'line',
                data: {
                    labels: desempenhoCtrl.desempenho.encerramentos,
                    datasets: [{
                        label: 'Aproveitamento',
                        borderColor: '#46BFBD',
                        data: desempenhoCtrl.desempenho.aproveitamentos,
                    }, {
                        label: 'Envolvimento',
                        borderColor: '#2196F3',
                        data: desempenhoCtrl.desempenho.envolvimentos,
                    }]
                },
                options: {
                    scales: {
                        yAxes: [
                            {
                                id: 'y-axis-1',
                                type: 'linear',
                                display: true,
                                position: 'left',
                                ticks: {
                                    max: 100,
                                    min: 0,
                                    stepSize: 20
                                }
                            }
                        ]
                    },
                    tooltips: {
                        intersect: false,
                        mode: 'nearest'
                    },
                    // onHover: function (evt, points) {
                    //     if (points && points.length > 0) {
                    //         var indice = points[0]._index;
                    //         getTemaAtencaoByQuizPublicado(desempenhoCtrl.desempenho.publicacoes[indice]);
                    //     }
                    // },
                    onClick: function (evt, points) {
                        if (points && points.length > 0) {
                            var indice = points[0]._index;
                            getTemaAtencaoByQuizPublicado(desempenhoCtrl.desempenho.publicacoes[indice]);
                        }
                    }
                }
            });
        }

        function getTemaAtencaoByQuizPublicado(quizPublicado) {
            if (quizPublicado && quizPublicado.id) {
                SERVICE.getTemaAtencaoByQuizPublicado(quizPublicado.id).then(function (response) {
                    if (response && response.data) {
                        desempenhoCtrl.temaAtencao = response.data;
                        configGraficoAtencao();
                    }
                });
            }
        }

        function configGraficoAtencao() {
            var elemento = document.getElementById('pieChart').getContext('2d');
            desempenhoCtrl.pieChart = new Chart(elemento, {
                type: 'pie',
                data: {
                    labels: ['% Acertos', '% Erros'],
                    datasets: [{
                        label: 'Aproveitamento',
                        backgroundColor: ['#46BFBD', '#F7464A'],
                        borderColor: ['#46BFBD', '#F7464A'],
                        data: [100 - desempenhoCtrl.temaAtencao.percentErros, desempenhoCtrl.temaAtencao.percentErros],
                    }]
                }
            });
        }

        // var ctx = document.getElementById('myChart').getContext('2d');
        // var chart = new Chart(ctx, {
        //     // The type of chart we want to create
        //     type: 'pie',

        //     // The data for our dataset
        //     data: {
        //         labels: ["January", "February", "March", "April", "May", "June", "July"],
        //         datasets: [{
        //             label: "My First dataset",
        //             // backgroundColor: 'rgb(255, 99, 132)',
        //             // borderColor: 'rgb(255, 99, 132)',
        //             data: [0, 10, 5, 2, 20, 30, 45],
        //         }]
        //     },

        //     // Configuration options go here
        //     options: {
        //         tooltips: {
        //             intersect: false,
        //             mode: 'nearest'
        //         },
        //         onClick: function () {
        //             console.log("NEEE");
        //         }
        //     }
        // });
    }
})();