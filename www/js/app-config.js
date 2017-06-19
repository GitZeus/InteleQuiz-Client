angular.module('intelequiz', ['ionic', 'ionic-material', 'toaster', 'ngAnimate', 'onezone-datepicker', 'timer'])
    .config(customConfig)
    .factory(customInterceptor)
    .run(customRun);

customConfig.$inject = ['$ionicConfigProvider', '$httpProvider', '$compileProvider'];
customInterceptor.$inject = ['$q', '$log', 'UTIL'];
customRun.$inject = ['$rootScope', '$ionicPlatform']

function customConfig($ionicConfigProvider, $httpProvider, $compileProvider) {
    $compileProvider.debugInfoEnabled(false);
    $httpProvider.interceptors.push(customInterceptor);
    $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.scrolling.jsScrolling(false);
}

function customInterceptor($q, $log, UTIL) {
    return {
        'request': function (config) {
            return config;
        },
        'requestError': function (rejection) {
            $log.log("REQUEST ERROR: ", rejection);
            return $q.reject(rejection);
        },
        'response': function (response) {
            if (response.data.message) {
                UTIL.showToaster(response.data.message);
            }
            return response;
        },
        'responseError': function (rejection) {
            $log.log("RESPONSE ERROR: ", rejection);
            UTIL.showToaster({ type: 'error', text: 'Falha na requisição ao servidor' });
            return $q.reject(rejection);
        }
    };
}

function customRun($rootScope, $ionicPlatform) {
    $rootScope.URL_BASE = "https://intelequiz.herokuapp.com/";
    // $rootScope.URL_BASE = "http://192.168.0.2:8080/";

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
}