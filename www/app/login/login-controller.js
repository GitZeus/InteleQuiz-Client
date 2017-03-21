/* global angular */
(function () {
    'use strict';
    angular
            .module('intelequiz')
            .controller('loginCtrl', loginCtrl);
    loginCtrl.$inject = ['$scope', '$ionicPopup', '$ionicLoading', '$timeout', '$state', 'loginSrvc', 'AppService'];
    function loginCtrl($scope, $ionicPopup, $ionicLoading, $timeout, $state, loginSrvc, AppService) {
        var loginCtrl = this;
        var loginSrvc = loginSrvc;

        loginCtrl.autenticar = autenticar;
        loginCtrl.listarPerfis = loginSrvc.listarPerfis();

        function autenticar(usuario) {
            $ionicLoading.show({
                template: 'Loading <br/> <ion-spinner></ion-spinner>'
            });
            loginSrvc.autenticar(usuario).then(function (response) {
                $timeout(function () {
                    $ionicLoading.hide();
                    if (response.data) {
                        AppService.usuarioLogado = response;
                        $state.go('menu.home');
                    } else if (response.message) {
                        $ionicPopup.alert({
                            title: 'Atenção',
                            template: response.message.text,
                            buttons: [{
                                    text: '<b>Fechar</b>',
                                    type: 'button-assertive'
                                }]
                        });
                    }
                }, 2000);
            });
        }
    }
})();