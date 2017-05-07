/* global angular */
(function () {
    'use strict';
    angular
        .module('intelequiz')
        .controller('publicarQuizCtrl', publicarQuizCtrl);
    publicarQuizCtrl.$inject = ['DADOS', 'SERVICE', 'CLASSES', '$state', '$scope', '$timeout', 'ionicMaterialMotion', 'ionicDatePicker'];
    function publicarQuizCtrl(DADOS, SERVICE, CLASSES, $state, $scope, $timeout, ionicMaterialMotion, ionicDatePicker) {
        var publicarQuizCtrl = this;

        init();

        function init() {
            publicarQuizCtrl.init = init;
            publicarQuizCtrl.usuarioLogado = DADOS.USUARIO_LOGADO;
            publicarQuizCtrl.arrayTurma = [];
            publicarQuizCtrl.quiz = $state.params.quiz;


            publicarQuizCtrl.selecionarData = selecionarData;
            listTurmasByProfessorByDisciplina(publicarQuizCtrl.usuarioLogado, publicarQuizCtrl.quiz.disciplina);

            $scope.$broadcast('scroll.refreshComplete');
        }

        function selecionarData() {
            var ipObj1 = {
                callback: function (val) {  //Mandatory
                    publicarQuizCtrl.data = new Date(val);
                    console.log('Return value from the datepicker popup is : ' + val, new Date(val));
                },
                from: new Date(),           //Optional
                inputDate: new Date(),      //Optional
                mondayFirst: true,          //Optional
                closeOnSelect: true,        //Optional
                templateType: 'popup'       //Optional
            };
            ionicDatePicker.openDatePicker(ipObj1);
        }

        function listTurmasByProfessorByDisciplina(professor, disciplina) {
            if (professor && professor.matricula && disciplina && disciplina.id) {
                SERVICE.listTurmasByProfessorByDisciplina(publicarQuizCtrl.usuarioLogado.matricula, disciplina.id).then(function (response) {
                    if (response.data && response.data.length > 0) {
                        publicarQuizCtrl.arrayTurma = response.data;
                        publicarQuizCtrl.filtroTurma = publicarQuizCtrl.arrayTurma[0];
                    }
                });
            }
        }
    }
})();