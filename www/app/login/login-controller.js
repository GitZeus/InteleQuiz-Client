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

        loginCtrl.usuario = {};
        
        loginCtrl.autenticar = autenticar;
        
        loginSrvc.tiposUsuario().then(function (response) {
            if (response.data) {
                loginCtrl.listarPerfis = response.data;
                loginCtrl.usuario.perfil = loginCtrl.listarPerfis[0];
                loginCtrl.usuario.login = "MA123";
                loginCtrl.usuario.senha = "123";
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
        });

        function autenticar(usuario) {
            loginSrvc.autenticar(usuario).then(function (response) {
                if (response.data) {
                    AppService.usuarioLogado = response.data;
                    $state.go('menu.home'); //,{}, {reload: true}
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
            });
        }
    }
})();