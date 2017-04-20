/* global angular */
(function () {
    'use strict';
    angular
            .module('intelequiz')
            .factory('DADOS_GLOBAIS', DADOS_GLOBAIS)
            .factory('SERVICOS_GLOBAIS', SERVICOS_GLOBAIS);

    DADOS_GLOBAIS.$inject = ['$log'];
    SERVICOS_GLOBAIS.$inject = ['DADOS_GLOBAIS', '$window', '$log', 'toaster'];

    function DADOS_GLOBAIS($log) {
        var data = {
            URL_BASE: "http://10.61.14.64:8080/",// + "/intelequiz-srv/",
            USUARIO_LOGADO: {},
            TIPOS_USUARIO: [],
            NIVEIS_QUESTAO: [],
            TIPOS_QUESTAO: [],
            STATUS_QUIZ_QUESTAO: []
        };
        $log.info("DADOS_GLOBAIS: ", data);
        return data;
    }

    function SERVICOS_GLOBAIS(DADOS_GLOBAIS, $window, $log, toaster) {
        var service = {
            showToaster: function (message) {
                toaster.pop({
                    "type": message.type,
                    "body": message.text
                });
            },
            success: function (response) {
                $log.info(response);
                if (response.data.message) {
                    response.data.message.type = response.data.message.type.toLowerCase();
                }
                return response.data;
            },
            error: function (response) {
                $log.error(response);
                return {data: null, message: {type: 'error', text: 'Falha na comunicação com o servidor'}};
            }
        };
        return service;
    }
})();