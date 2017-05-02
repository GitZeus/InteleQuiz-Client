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
        .directive('comboDisciplina', function () {
            return {
                restrict: 'E',
                scope: {
                    disciplinas: '='
                },
                templateUrl: 'templates/combo-disciplina.tpl.html',
                link: function (scope) {
                    setTimeout(function () {
                        console.log("Link", scope.disciplinas);
                        scope.filtroDisciplina = scope.disciplinas[0];
                        scope.$apply();
                    })
                },
                controller: function ($scope) {
                    // setTimeout(function () {
                        console.log("Controller", $scope.disciplinas);
                    //     $scope.filtroDisciplina = $scope.disciplinas[0];
                    //     $scope.$apply();
                    // }, 3000)
                }
            }
        })
})();