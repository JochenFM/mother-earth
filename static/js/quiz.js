var modalCorrect = document.getElementById('modal-correct')

modalCorrect.addEventListener('shown.bs.modal', function () {
  myInput.focus()
})

// const start = document.querySelector("#start");
const questionRef = document.querySelector("#question");
const answersRef = Array.from(document.querySelectorAll(".answer-text"));
const answersContainerRef = Array.from(document.querySelectorAll(".answers-container"));
const nextQuestionsRef = document.querySelector('#next-question');
const finishRef = document.querySelector('#finish');
const scoreRef = document.querySelector('#score');
const incorrectScoreRef = document.querySelector('#incorrect');
const questionImageRef = document.querySelector('#fit-picture');

let answerSelected = true;
let currentQuestionIndex = -1;
let score = 0;
let availableQuestions= [];

// Constants
const QUESTIONS = [
    {
        "question": "1.	More than half of the breathable oxygen in the world comes from where?",
        "options": ["Forests", "The Ocean", "Flowering Plants", "Clouds"],
        "correct": 2,
    },
    {
        "question": "2.	How much of the worlds oxygen is produced by just the Amazon rainforest?",
        "options": ["1%", "5%", "10%", "20%"],
        "correct": 4,
    },
    {
        "question": "3.	How much oxygen does an average 50-year-old tree provide?",
        "options": ["Enough for 1 person per year", "Enough for 4 persons per year", "Enough for 8 persons per year", "Enough for 10 persons per year"],
        "correct": 2,
    },
    {
        "question": "4. When was the first earth day celebrated?",
        "options": ["1970", "1985", "1990", "2005"],
        "correct": 1,
    },
    {
        "question": "5. In its lifetime, one reusable bag can prevent the use of how many plastic bags",
        "options": ["50", "300", "600", "1000"],
        "correct": 3,
    },
    {
        "question": "6. What percent of Earths water can be used by humans?",
        "options": ["Less than one percent", "Less than five percent", "Less than ten percent", "Less than fifteen percent"],
        "correct": 1,
    },
    {
        "question": "7. Which of these species are threatened by global warming?",
        "options": ["Koala", "Clownfish", "Artic fox ", "All of the above"],
        "correct": 4,
    },
    {
        "question": "8. What is most frequently found in beach clean-ups?",
        "options": ["Glass", "Shoes", "Pieces of Plastic", "Jewellery"],
        "correct": 3,
    },
]

// Start quiz

startGame = () => {
    currentQuestionIndex = -1;
    score = 0;
    availableQuestions= [...QUESTIONS];
    renderNextQuestion();
}

//Quiz game

function renderNextQuestion() {
    for (let answerRef of answersRef) {
        answerRef.classList.remove("correct");
        answerRef.classList.remove("incorrect")
    }
    console.log('questionIndex', currentQuestionIndex)
    console.log('questionLength', QUESTIONS.length -1)
    if (currentQuestionIndex === QUESTIONS.length -1) {
        nextQuestionsRef.style.display = 'none'  
        finishRef.style.display = 'inline'  
    } else {
        finishRef.style.display = 'none'
        if (answerSelected) {
            currentQuestionIndex++;
            let nextQuestion = QUESTIONS[currentQuestionIndex];
    
            questionRef.innerText = nextQuestion["question"]
            for (i = 0; i<nextQuestion["options"].length; i++){
                answersRef[i].innerText = nextQuestion["options"][i];
            }
    
            //questionImageRef.src=nextQuestion["imgSrc"]
            answerSelected = false;
        } 
    }
    
}

function onUserSelection(clickEvent) {
    if(!answerSelected) {
        let userSelection = clickEvent.currentTarget.children[1].dataset.number;
        let currentQuestion = QUESTIONS[currentQuestionIndex];
        let correctOption = currentQuestion["correct"];
        answerSelected = true;
        
        if (userSelection == correctOption) {
            clickEvent.currentTarget.children[1].classList.add('correct');
            incrementScore();
        } else {
            clickEvent.currentTarget.children[1].classList.add('incorrect');
            incrementWrongAnswer();
        }
    }
    
}

// scores area
function incrementScore() {
    let oldScore = parseInt(scoreRef.innerText);
    scoreRef.innerText = ++oldScore;
  }
  
  function incrementWrongAnswer() {
    let oldScore = parseInt(incorrectScoreRef.innerText);
    incorrectScoreRef.innerText = ++oldScore;
  }

  window.addEventListener('DOMContentLoaded', (event) => {
    startGame()
});

for (const answer of answersContainerRef) {
    answer.addEventListener("click", onUserSelection);
}

function saveHighScore() {
    let score = parseInt(scoreRef.innerText);
    localStorage.setItem('score', score);
    window.location.assign("/highscores");
}
