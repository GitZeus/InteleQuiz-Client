(function () {
    'use strict';
    angular.module('intelequiz')
        .controller('desempenhoCtrl', desempenhoCtrl);

    desempenhoCtrl.$inject = ['DADOS', 'SERVICE', 'CLASSES', '$scope', '$state', '$timeout', 'ionicMaterialMotion'];

    function desempenhoCtrl(DADOS, SERVICE, CLASSES, $scope, $state, $timeout, ionicMaterialMotion) {
        var desempenhoCtrl = this;

        init();

        function init() {
            SERVICE.displayMaterialInk();

            desempenhoCtrl.init = init;
            desempenhoCtrl.usuarioLogado = SERVICE.localStorageUtil.get('obj_usuario_logado');
            desempenhoCtrl.getDesempenhoByTurma = getDesempenhoByTurma;

            desempenhoCtrl.mediaGeral = {};
            desempenhoCtrl.acompanhamentoEvolutivo = {};
            desempenhoCtrl.criticidade = {};
            desempenhoCtrl.publicacaoSelecionada = {};
            desempenhoCtrl.temaSelecionado = {};

            listTurmasByUsuario(desempenhoCtrl.usuarioLogado);

            $scope.$broadcast('scroll.refreshComplete');
        }

        function listTurmasByUsuario(usuario) {
            if (usuario.perfil === 'Aluno' && usuario.ra) {
                SERVICE.listTurmaByAluno(usuario.ra).then(function (response) {
                    if (response && response.data && response.data.length > 0) {
                        desempenhoCtrl.arrayTurma = response.data;
                        desempenhoCtrl.filtroTurma = desempenhoCtrl.arrayTurma[0];
                        getDesempenhoByTurma(desempenhoCtrl.filtroTurma);
                    }
                });
            } else if (usuario.perfil === 'Professor' && usuario.matricula) {
                SERVICE.listTurmaByProfessor(usuario.matricula).then(function (response) {
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
                if (desempenhoCtrl.usuarioLogado.perfil === 'Aluno') {
                    SERVICE.getDesempenhoByTurmaByAluno(turma.id, desempenhoCtrl.usuarioLogado.ra).then(function (response) {
                        if (response && response.data) {
                            desempenhoCtrl.desempenho = response.data;
                            var config1 = {
                                titulo: 'Média Turma vs Aluno',
                                categorias: ['Aproveitamento Médio'],
                                series: [{
                                    name: 'Turma',
                                    data: [desempenhoCtrl.desempenho.medAproveitamentoTurma]
                                }, {
                                    name: 'Aluno',
                                    data: [desempenhoCtrl.desempenho.medAproveitamentoAluno]
                                }]
                            }
                            var config2 = {
                                titulo: 'Evolução Turma vs Aluno',
                                categorias: desempenhoCtrl.desempenho.encerramentos,
                                series: [{
                                    name: 'Turma',
                                    data: desempenhoCtrl.desempenho.aproveitamentosTurma
                                }, {
                                    name: 'Aluno',
                                    data: desempenhoCtrl.desempenho.aproveitamentosAluno
                                }]
                            }
                            configGraficoMedia(config1);
                            configGraficoAcompanhamento(config2);
                        }
                    });
                } else if (desempenhoCtrl.usuarioLogado.perfil === 'Professor') {
                    SERVICE.getDesempenhoByTurmaByProfessor(turma.id).then(function (response) {
                        if (response && response.data) {
                            desempenhoCtrl.desempenho = response.data;
                            var config1 = {
                                titulo: 'Média da Turma',
                                categorias: ['Média'],
                                series: [{
                                    name: 'Aproveitamento',
                                    data: [desempenhoCtrl.desempenho.medAproveitamentoTurma]
                                }, {
                                    name: 'Envolvimento',
                                    data: [desempenhoCtrl.desempenho.medEnvolvimentoTurma]
                                }]
                            }
                            var config2 = {
                                titulo: 'Evolução da Turma',
                                categorias: desempenhoCtrl.desempenho.encerramentos,
                                series: [{
                                    name: 'Aproveitamento',
                                    data: desempenhoCtrl.desempenho.aproveitamentosTurma
                                }, {
                                    name: 'Envolvimento',
                                    data: desempenhoCtrl.desempenho.envolvimentosTurma
                                }]
                            }
                            configGraficoMedia(config1);
                            configGraficoAcompanhamento(config2);
                        }
                    });
                }
            }

        }

        function limparGraficos() {
            desempenhoCtrl.mediaGeral.destroy ? desempenhoCtrl.mediaGeral.destroy() : void 0;
            desempenhoCtrl.acompanhamentoEvolutivo.destroy ? desempenhoCtrl.acompanhamentoEvolutivo.destroy() : void 0;
            desempenhoCtrl.criticidade.destroy ? desempenhoCtrl.criticidade.destroy() : void 0;
            desempenhoCtrl.publicacaoSelecionada = {};
            desempenhoCtrl.temaSelecionado = {};
            desempenhoCtrl.arrayQuestoesCriticas = [];
        }

        function configGraficoMedia(config) {
            desempenhoCtrl.mediaGeral = Highcharts.chart('mediaGeral', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: config.titulo
                },
                xAxis: {
                    categories: config.categorias
                },
                yAxis: {
                    title: {
                        text: null
                    },
                    min: 0,
                    max: 100,
                    tickInterval: 20
                },
                tooltip: {
                    shared: false,
                    valueSuffix: ' %'
                },
                series: config.series
            });
        }

        function configGraficoAcompanhamento(config) {
            var myChart = Highcharts.chart('acompanhamentoEvolutivo', {
                chart: {
                    type: 'spline'
                },
                title: {
                    text: config.titulo
                },
                xAxis: {
                    categories: config.categorias
                },
                yAxis: {
                    title: {
                        text: null
                    },
                    min: 0,
                    max: 100,
                    tickInterval: 20
                },
                series: config.series,
                tooltip: {
                    shared: true,
                    valueSuffix: ' %'
                },
                plotOptions: {
                    spline: {
                        events: {
                            click: function (e) {
                                desempenhoCtrl.publicacaoSelecionada = desempenhoCtrl.desempenho.publicacoes[e.point.index];
                                getTemaCritico(desempenhoCtrl.publicacaoSelecionada, e.point.category);
                            }
                        }
                    }
                }
            });
        }

        function getTemaCritico(quizPublicado, dataEncerramento) {
            if (quizPublicado && quizPublicado.id) {
                if (desempenhoCtrl.usuarioLogado.perfil === 'Professor') {
                    SERVICE.getTemaCriticoByPublicacao(quizPublicado.id).then(function (response) {
                        if (response && response.data) {
                            desempenhoCtrl.temasCriticos = response.data.temasCriticos;
                            var data = []
                            angular.forEach(desempenhoCtrl.temasCriticos, function (value) {
                                data.push({
                                    name: value.nome,
                                    y: value.percentErros
                                })
                            });
                            var config = {
                                titulo: 'Diagnóstico da Turma em: ' + dataEncerramento,
                                series: [{
                                    name: 'Diagnóstico',
                                    colorByPoint: true,
                                    data: data
                                }]
                            }
                            configGraficoCriticidade(config);
                        }
                    });
                } else if (desempenhoCtrl.usuarioLogado.perfil === 'Aluno') {
                    SERVICE.getTemaCriticoByPublicacaoByAluno(quizPublicado.id, desempenhoCtrl.usuarioLogado.ra).then(function (response) {
                        if (response && response.data) {
                            desempenhoCtrl.temasCriticos = response.data.temasCriticos;
                            var data = []
                            angular.forEach(desempenhoCtrl.temasCriticos, function (value) {
                                data.push({
                                    name: value.nome,
                                    y: value.percentErros
                                })
                            });
                            var config = {
                                titulo: 'Diagnóstico do Aluno em: ' + dataEncerramento,
                                series: [{
                                    name: 'Diagnóstico',
                                    colorByPoint: true,
                                    data: data
                                }]
                            }
                            configGraficoCriticidade(config);
                        }
                    });
                }
            }
        }

        function configGraficoCriticidade(config) {
            desempenhoCtrl.criticidade = new Highcharts.chart('temaCritico', {
                chart: {
                    type: 'pie'
                },
                title: {
                    text: config.titulo
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f} %</b>'
                },
                plotOptions: {
                    pie: {
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true,
                        events: {
                            click: function (e) {
                                desempenhoCtrl.temaSelecionado = desempenhoCtrl.temasCriticos[e.point.index];
                                listQuestoesCriticas(desempenhoCtrl.temaSelecionado, desempenhoCtrl.publicacaoSelecionada);
                            }
                        }
                    }
                },
                series: config.series
            });
        }

        function listQuestoesCriticas(tema, publicacao) {
            if (tema && tema.id && publicacao && publicacao.id) {
                if (desempenhoCtrl.usuarioLogado.perfil === 'Professor') {
                    SERVICE.listQuestaoCriticaByPublicacaoByTemaCritico(publicacao.id, tema.id).then(function (response) {
                        if (response && response.data && response.data.questoesCriticas) {
                            desempenhoCtrl.arrayQuestoesCriticas = response.data.questoesCriticas;
                        }
                    });
                } else if (desempenhoCtrl.usuarioLogado.perfil === 'Aluno') {
                    SERVICE.listQuestaoCriticaByPublicacaoByAlunoByTemaCritico(publicacao.id, desempenhoCtrl.usuarioLogado.ra, tema.id).then(function (response) {
                        if (response && response.data && response.data.questoesCriticas) {
                            desempenhoCtrl.arrayQuestoesCriticas = response.data.questoesCriticas;
                        }
                    });
                }
            }
        }
    }
})();