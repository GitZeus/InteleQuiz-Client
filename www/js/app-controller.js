(function () {
    'use strict';

    angular.module('intelequiz')
            .controller('appCtrl', appCtrl);

    appCtrl.$inject = ['ionicMaterialInk'];

    function appCtrl(ionicMaterialInk) {
        var appCtrl = this;
        ionicMaterialInk.displayEffect();
    }
})();