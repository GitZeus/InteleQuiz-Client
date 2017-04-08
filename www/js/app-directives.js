/* global angular */
(function () {
    'use strict';
    angular
            .module('intelequiz')
            .directive('appLoading', function ($http, $ionicLoading) {
                return {
                    restrict: 'A',
                    link: function (scope, elm, attrs, ctrl) {
                        scope.isLoading = function () {
                            return $http.pendingRequests.length > 0;
                        }

                        scope.$watch(scope.isLoading, function (v) {
                            if (v) {
                                $ionicLoading.show({
                                    template: 'Loading <br/> <ion-spinner></ion-spinner>'
                                });
                            } else {
                                $ionicLoading.hide();
                            }
                        })
                    }
                }
            })

})();