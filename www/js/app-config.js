angular.module('intelequiz', ['ionic', 'ionic-material', 'toaster', 'ngAnimate', 'onezone-datepicker'])
        .factory('interceptor', ['$q', '$log', 'toaster', function ($q, $log, toaster) {
                return {
                    'request': function (config) {
//                       $log.log("REQUEST: ", config);
                        return config;
                    },
                    'requestError': function (rejection) {
                        $log.log("REQUEST ERROR: ", rejection);
                        return $q.reject(rejection);
                    },
                    'response': function (response) {
//                        $log.log("RESPONSE: ", response);
                        if(response.data.message){
                            showToaster(response.data.message);
                        }
                        return response;
                    },
                    'responseError': function (rejection) {
                        $log.log("RESPONSE ERROR: ", rejection);
                        showToaster({type: 'error',text: 'Falha na requisição ao servidor'});
                        return $q.reject(rejection);
                    }
                };

                function showToaster(message) {
                    toaster.pop({
                        "type": message.type.toLowerCase(),
                        "body": message.text
                    });
                }
            }])
        .config(function ($ionicConfigProvider, $httpProvider) {
            $ionicConfigProvider.tabs.position('bottom');
            $httpProvider.interceptors.push('interceptor');
        })
        .run(function ($ionicPlatform) {
            $ionicPlatform.ready(function () {
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                    // for form inputs)
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

                    // Don't remove this line unless you know what you are doing. It stops the viewport
                    // from snapping when text inputs are focused. Ionic handles this internally for
                    // a much nicer keyboard experience.
                    cordova.plugins.Keyboard.disableScroll(true);
                }
                if (window.StatusBar) {
                    StatusBar.styleDefault();
                }

            });
        });