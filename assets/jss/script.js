var timeEl = document.querySelector('#time');
var timeLeft = 60;
var timerId;


var startBtn = document.querySelector('#start-btn');
var startPage = document.querySelector('#start-page');

var questionIndex = 0;
var quizBox = document.querySelector('#quiz-box');
var questionTextEl = document.querySelector('#question-text');
var choicesEl = document.querySelector('#choices');
var resultEl = document.querySelector('#result');



var scoreBox = document.querySelector('#end-page');
var scoreEl = document.querySelector('#score');
var submitBtn = document.querySelector('#submit-btn');
var inputEl = document.querySelector('#user-input');

var questions = [
    {
        text: "What does HTML stand for?",
        choices: ["Hypertext Preprocessor", "Hypertext Markup Language", "Hypertext Multiple Language", "Hypertool Multi Language"],
        answers: 1
    },

    {
        text: "What does CSS stand for?",
        choices: ["Common Style Sheet", "Colorful Style Sheet", "Cascading Style Sheet", "Computer Style Sheet"],
        answers: 2

    },

    {
        text: "What is NOT included in data types?",
        choices: ["Strings", "Alerts", "Booleans", "Numbers"],
        answers: 3
    },

    {
        text: "Which of the following is the HTML attribute used when an image does not appear?",
        choices: ["src", "alt", "text", "image"],
        answers: 1
    },

    {
        text: "How do you write a function in JavaScript?",
        choices: ["function myFunction()", "function = myFunction()", "function:myFunction()", "myfunction =()"],
        answers: 0
    }
];


startBtn.addEventListener('click', function handleStartBtnClick(e) {
    startPage.style.display = 'none';

    timerId = setInterval(countDown, 1000);
 
    quizBox.style.display = 'block';

    startQuiz();
});

function countDown() {
    timeEl.innerHTML = `Time Remaining: ${timeLeft}`;

    
    if (timeLeft < 1) {
        clearTimeout(timerId);

      
        displayScore();
    }
    timeLeft--;
};

function startQuiz() {
  
    var currentQuestion = questions[questionIndex];

    questionTextEl.textContent = currentQuestion.text;

    choicesEl.innerHTML = '';

    
    clearResults();

    for (var i = 0; i < currentQuestion.choices.length; i++) {
        var choiceBtn = document.createElement('button');

        choiceBtn.setAttribute('class', 'btn');
        choiceBtn.textContent = currentQuestion.choices[i];
        choicesEl.appendChild(choiceBtn);
    };
};

choicesEl.addEventListener('click', function handleChoicesClick(e) {
    e.preventDefault();
    if (!e.target.matches('button'))
        return;


    var userAnswer = e.target.textContent;


    var question = questions[questionIndex];

    var correct = question.choices[question.answers];

    if (userAnswer === correct) {
        timeLeft += 3;
        resultEl.style.display = "block";
        resultEl.textContent = "Correct!";
    }
    else {
        timeLeft -= 10;
        resultEl.style.display = "block";
        resultEl.textContent = "Incorrect";
    }

    questionIndex++

    if (questionIndex === questions.length) {
        clearTimeout(timerId);
        return displayScore();
    }

    setTimeout(startQuiz, 1000);
});


function clearResults() {
    resultEl.style.display = 'none';
};

function displayScore() {
    quizBox.style.display = 'none';
    timeEl.style.display = 'none';
    scoreBox.style.display = 'block';

    if (timeLeft < 0) {
        scoreEl.textContent = 'Your score is 0'
    }
    else {
        scoreEl.textContent = `Your score is ${timeLeft}`;
    }

};

submitBtn.addEventListener('click', function handleSaveHighscore(e) {
    e.preventDefault();
    var initials = inputEl.value.trim();
    if (initials === "") {
        alert('Input cannot be blank!')
        return '';
    }
    else if (initials.length > 3) {
        alert('Initials must be no longer than 3 characters in length!')
        return '';
    }

    var highscores;
    if (JSON.parse(localStorage.getItem("highscores")) != null)
        highscores = JSON.parse(window.localStorage.getItem("highscores"));
    else
        highscores = [];


    var score = {
        initials: initials,
        highscore: timeLeft
    };

    highscores.push(score);
    localStorage.setItem("highscores", JSON.stringify(highscores));
    location.href = "highscores.html";

    handleSaveHighscore();

});
