(function () {
    'use strict';

    angular
        .module('intelequiz')
        .controller('quizCtrl', quizCtrl)

    quizCtrl.$inject = ['$location'];

    function quizCtrl($location) {
        var quizCtrl = this;

        init();

        function init() {

            listQuizAtivosByProfessor();

        }

        function listQuizAtivosByProfessor() {

        }
    }
})();