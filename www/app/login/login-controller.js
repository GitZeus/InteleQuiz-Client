/* global angular */
(function () {
    'use strict';
    angular
        .module('intelequiz')
        .controller('loginCtrl', loginCtrl);
    loginCtrl.$inject = ['DADOS', 'SERVICE', 'CLASSES', '$state', 'ionicMaterialInk', '$scope'];
    function loginCtrl(DADOS, SERVICE, CLASSES, $state, ionicMaterialInk, $scope) {
        var loginCtrl = this;

        init();

        function init() {
            SERVICE.displayMaterialInk();
            loginCtrl.usuario = new CLASSES.Usuario();
            loginCtrl.init = init;
            loginCtrl.autenticar = autenticar;
            loginCtrl.mockUser = mockUser;
            verificaUsuarioLogado();
        }

        function verificaUsuarioLogado() {
            if (SERVICE.localStorageUtil.get('obj_usuario_logado')) {
                $state.go('menu.ranking-turma');
            } else {
                listPerfilUsuario();
            }
        }

        function listPerfilUsuario() {
            if (DADOS.arr_tipo_usuario && DADOS.arr_tipo_usuario.length > 0) {
                loginCtrl.arrayTiposUsuario = DADOS.arr_tipo_usuario;
                loginCtrl.usuario.perfil = loginCtrl.arrayTiposUsuario[0];
                mockUser();
            } else {
                SERVICE.listPerfilUsuario().then(function (response) {
                    if (response.data) {
                        DADOS.arr_tipo_usuario = response.data;
                        loginCtrl.arrayTiposUsuario = DADOS.arr_tipo_usuario;
                        loginCtrl.usuario.perfil = loginCtrl.arrayTiposUsuario[0];
                        loginCtrl.mockUser();
                    }
                });
            }
        }

        function autenticar(usuario) {
            SERVICE.getUsuarioByLoginSenha(usuario).then(function (response) {
                if (response.data) {
                    DADOS.obj_usuario_logado = response.data;
                    SERVICE.localStorageUtil.set('obj_usuario_logado', response.data);
                    $state.go('menu.ranking-turma');
                }
            });
        }

        function mockUser() {
            if (loginCtrl.usuario.perfil == 'Aluno') {
                loginCtrl.usuario.login = "21550465";
                loginCtrl.usuario.senha = "123";
            } else {
                loginCtrl.usuario.login = "MA123";
                loginCtrl.usuario.senha = "123";
            }
        }
    }
})();