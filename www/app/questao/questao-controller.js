/* global angular */
(function () {
    'use strict';
    angular
            .module('intelequiz')
            .controller('questaoCtrl', questaoCtrl);
    questaoCtrl.$inject = ['$scope', '$ionicPopup', '$ionicLoading', '$timeout', '$state', 'questaoSrvc', 'AppService','ionicMaterialInk','ionicMaterialMotion'];
    function questaoCtrl($scope, $ionicPopup, $ionicLoading, $timeout, $state, questaoSrvc, AppService,ionicMaterialInk,ionicMaterialMotion) {
        var questaoCtrl = this;
        var questaoSrvc = questaoSrvc;
        questaoCtrl.usuarioLogado = AppService.usuarioLogado;
        
        ionicMaterialInk.displayEffect();
        ionicMaterialMotion.ripple();
        
        questaoCtrl.listDisciplinas = [];
        questaoCtrl.filtroDisciplina = {};
        questaoCtrl.listTags = [];
        questaoCtrl.filtroTag = {};
        
        questaoCtrl.listTagsByDisciplina = listTagsByDisciplina;
        
        questaoSrvc.listDisciplinas(questaoCtrl.usuarioLogado).then(function(response){
            if(response.data){
                questaoCtrl.listDisciplinas = response.data;
                questaoCtrl.filtroDisciplina = questaoCtrl.listDisciplinas[0];
                listTagsByDisciplina(questaoCtrl.filtroDisciplina);
            }
        });
        
        function listTagsByDisciplina(disciplina){
            questaoSrvc.listTags(disciplina).then(function(response){
               if(response.data){
                   questaoCtrl.listTags = response.data;
                   questaoCtrl.filtroTag = questaoCtrl.listTags[0];
                   listQuestoesByTag();
               } 
            });
        }
        
        function listQuestoesByTag(tag){
            questaoSrvc.listQuestoes().then(function(response){
               if(response.data){
                   questaoCtrl.listTags = response.data;
                   questaoCtrl.filtroTag = questaoCtrl.listTags[0];
                   listQuestoesByTag();
               } 
            });
        }
    }
})();