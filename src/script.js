//création de la class qui permet d'initialiser les questions.
/*
 * Represente la partie question/réponses.
 * @constructor
 * @param {string} text - la question.
 * @param {string} choices - les réponses possibles.
 * @param {string} answer - la bonne réponse.
 */
class Question {
  constructor(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
  }
  isCorrectAnswer(choice) {
    return this.answer === choice;
  }
}

//variable qui permet d'ecrire les questions et les reponses du quiz en reprenant la class écrite au dessus.
let questions = [
  new Question("Qui est Nick Furry ?", ["Le directeur du Shield", "Un agent de sécurité d'Iron Man", "La copine de Spiderman", ""],
    "Le directeur du Shield"),
  new Question("Quel est le vrai nom de Black Widow ?", ["Elena Romanoff", "Natasha Romanoff", "Petrouchka Romanoff", ""],
    "Natasha Romanoff"),
  new Question("Quelle arme utilise Hawkeye ?", ["Un arc", "Un bouclier", "Une cape", ""], "Un arc"),
  new Question("Comment se nomme le frère de Thor ?", ["Lucky", "Loki", "Le Z",""], "Loki"),
  new Question("En quelle année est sortie le premier film Iron Man ?", ["1998", "2008", "2018", ""], "2008")
];

console.log(questions);

//creation de la classe qui permet de comptabiliser le nombre de reponses justes.
/*
 * Represente le total de bonnes réponses.
 * @constructor
 * @param {number} score - nombre de réponses justes.
 * @param {string} questions - nombre de questions.
 * @param {number} currentQuestionIndex - position de la première question.
 */
class Quiz {
  constructor(questions) {
    this.score = 0;
    this.questions = questions;
    this.currentQuestionIndex = 0;
  }
  //question en cours.
  getCurrentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }
  //ajoute +1 au score quand la bonne réponse est sélectionnée.
  guess(answer) {
    if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
      this.score++;
    }
    this.currentQuestionIndex++;
  }
  //nombre total de réponses justes sur le nombre total de questions.
  hasEnded() {
    return this.currentQuestionIndex >= this.questions.length;
  }
}

//variables pour initialiser les données à afficher comme les questions, la page de fin du quiz et la progression dans le quiz.
const afficher = {
  //affiche les questions du quiz.
  elementShown: function (id, text) {
    let element = document.getElementById(id);
    element.innerHTML = text;
  },
  //résultat du quiz.
  endQuiz: function () {
    endQuizHTML = 
      `<h3 >Votre score est de ${quiz.score} / ${quiz.questions.length}</h3>`;
      this.elementShown("quiz", endQuizHTML);
      //bouton Try Again.
      const btntry = document.createElement("button");
      const tryagain = document.createTextNode("Try again");
      btntry.appendChild(tryagain);
      document.getElementById("try").appendChild(btntry);
  },
  //affiche la question en cours.
  question: function () {
    this.elementShown("question", quiz.getCurrentQuestion().text);
  },
  //affiche les réponses possibles.
  choices: function () {
    let choices = quiz.getCurrentQuestion().choices;
    //execute la fonction quizApp lors du clique sur une des réponses.
    guessHandler = (id, guess) => {
      document.getElementById(id).onclick = function () {
        quiz.guess(guess);
        quizApp();
      }
    }
    for (let i = 0; i < choices.length; i++) {
      this.elementShown("choice" + i, choices[i]);
      guessHandler("guess" + i, choices[i]);
    }
  },
  //affiche la progression dans le quiz.
  progress: function () {
    let currentQuestionNumber = quiz.currentQuestionIndex + 1;
    this.elementShown("progress", "Question " + currentQuestionNumber + " sur " + quiz.questions.length);
  },
};

//gère le fonctionnement du quiz dont le défilement des questions/réponses.
quizApp = () => {
  if (quiz.hasEnded()) {
    afficher.endQuiz();
  } else {
    afficher.question();
    afficher.choices();
    afficher.progress();
  }
}
let quiz = new Quiz(questions);
quizApp();

console.log(quiz);