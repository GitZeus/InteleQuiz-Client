/* global angular */
(function () {
    'use strict';
    angular
        .module('intelequiz')
        .factory('UTIL', UTIL);

    UTIL.$inject = ['$log', 'toaster', 'ionicMaterialInk'];

    function UTIL($log, toaster, ionicMaterialInk) {
        var util = {
            success: success,
            error: error,
            showToaster: showToaster,
            displayMaterialInk: displayMaterialInk,
            localStorage: {
                set: function (key, value) {
                    return localStorage.setItem(key, JSON.stringify(value));
                },
                get: function (key) {
                    return JSON.parse(localStorage.getItem(key));
                },
                remove: function (key) {
                    return localStorage.removeItem(key);
                },
            }
        }

        function success(response) {
            $log.info(response);
            return response.data;
        }

        function error(response) {
            $log.error(response);
            response.data = null;
            return response;
        }

        function showToaster(message) {
            toaster.pop({
                "type": message.type ? message.type.toLowerCase() : 'warning',
                "body": message.text
            });
        }

        function displayMaterialInk() {
            ionicMaterialInk.displayEffect();
        }

        return util;
    }
})();