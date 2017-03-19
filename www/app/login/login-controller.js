/* global angular */
(function () {
    'use strict';
    angular
            .module('intelequiz')
            .controller('loginCtrl', loginCtrl);
    loginCtrl.$inject = ['$scope', '$ionicPopup', '$ionicLoading', '$timeout', '$state', 'LoginService', 'AppService'];
    function loginCtrl($scope, $ionicPopup, $ionicLoading, $timeout, $state, LoginService, AppService) {
        var loginCtrl = this;
        var loginService = LoginService;

        loginCtrl.autenticar = autenticar;

        function autenticar(usuario) {
            $ionicLoading.show({
                template: 'Loading <br/> <ion-spinner></ion-spinner>'
            });
            loginService.autenticar(usuario).then(function (response) {
                        if (response) {
                            if (response.cod_usuario) {
                                $timeout(function () {
                                    $ionicLoading.hide();
                                    AppService.usuarioLogado = response;
                                    $state.go('menu.home');
                                }, 2000);
                            } else {
                                $ionicLoading.hide();
                                $ionicPopup.alert({
                                    title: 'Atenção',
                                    template: 'Usuário ou senha incorretos'
                                });
                            }
                        } else {
                            $ionicLoading.hide();
                            $ionicPopup.alert({
                                title: 'Atenção',
                                template: 'Usuário ou senha incorretos'
                            });
                        }
                    }, function () {
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: 'Atenção',
                    template: 'Serviço indisponível, tente mais tarde'
                });
            });
        }
        ;
    }
})();