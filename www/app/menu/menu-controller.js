/* global angular */
(function () {
    'use strict';
    angular
            .module('intelequiz')
            .controller('menuCtrl', menuCtrl);
    menuCtrl.$inject = ['$scope', '$ionicPopup', '$ionicLoading', '$state', 'AppService'];
    function menuCtrl($scope, $ionicPopup, $ionicLoading, $state, AppService) {
        var menuCtrl = this;
        menuCtrl.usuarioLogado = AppService.usuarioLogado;
        console.log(menuCtrl.usuarioLogado);
        
    }
})();