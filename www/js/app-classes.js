/* global angular */
(function () {
  'use strict';
  angular
    .module('intelequiz')
    .factory('CLASSES', CLASSES);

  function CLASSES() {
    var classes = {
      Usuario: Usuario,
      Tema: Tema,
      Disciplina: Disciplina,
      Questao: Questao,
      Resposta: Resposta,
      Quiz: Quiz,
      TurmaQuiz: TurmaQuiz,
      Treino: Treino
    };
    return classes;

    function Usuario() {
      this.login = "";
      this.senha = "";
      this.perfil = "";
    }

    function Tema() {
      this.nome = "";
      this.disciplina = "";
      this.professor = "";
    }

    function Disciplina() {
      this.nome = "";
      this.sigla = "";
    }

    function Questao() {
      this.tipo = "";
      this.nivel = "";
      this.texto = "";
      this.status = "";
      this.respostas = [];
      this.temas = [];
    }

    function Resposta() {
      this.texto = "";
      this.certa = false;
    }

    function Quiz() {
      this.professor = {};
      this.disciplina = {};
      this.questoes = [];
      this.descricao = "";
      this.status = 0;
    }

    function TurmaQuiz() {
      this.turma = {};
      this.quiz = {};
      this.tsPublicacao = "";
      this.tsEncerramento = "";
    }

    function Treino() {
      this.aluno = {};
      this.turmaQuiz = {};
      this.tsInicio = "";
      this.tsFim = "";
      this.pontuacao = 0;
      this.aproveitamento = 0;
      this.respostas = [];
    }
  }
})();
