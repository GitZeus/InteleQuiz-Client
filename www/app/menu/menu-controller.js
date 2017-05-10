/* global angular */
(function () {
    'use strict';
    angular
            .module('intelequiz')
            .controller('menuCtrl', menuCtrl);
    menuCtrl.$inject = ['DADOS', 'SERVICE', 'CLASSES', '$state', '$scope'];
    function menuCtrl(DADOS, SERVICE, CLASSES, $state, $scope) {
        var menuCtrl = this;

        init();

        function init() {
            SERVICE.ionicMaterialInk();
            menuCtrl.usuarioLogado = DADOS.USUARIO_LOGADO;

            $scope.onezoneDatepicker = {
                date: new Date(), // MANDATORY                     
                mondayFirst: false,
//                months: months,
//                daysOfTheWeek: daysOfTheWeek,
//                startDate: startDate,
//                endDate: endDate,
                disablePastDays: false,
                disableSwipe: false,
                disableWeekend: false,
//                disableDates: disableDates,
//                disableDaysOfWeek: disableDaysOfWeek,
                showDatepicker: false,
                showTodayButton: true,
                calendarMode: false,
                hideCancelButton: false,
                hideSetButton: false,
//                highlights: highlights,
                callback: function (value) {
                    console.warn(value);
                }
            }
        }
    }
})();