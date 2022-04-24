// Quiz App js
let rightAnswers = 0;
let answerCount = $(".answerCounter");
let drinks = 0
let drinkCount = document.getElementById("drinkCounter");
let turn = 0;
let gameOver = true 
let questionList
const ENDButton = document.getElementById('END-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

// An array contaiining all the possible questions and answers
const questionlist = [
    {
        question: "More than half of the breathable oxygen in the world comes from where?",
        answers: [
            {text: "Forests", "correct": false},
            {text: "The Ocean", "correct": true},
            {text: "Flowering Plants", "correct": false},
            {text: "Clouds", "correct": false}
        ]
    },
    // {
    //     question: "How much of the worlds oxygen is produced by just the Amazon rainforest?",
    //     answers: [
    //         {text: "1%", "correct": false},
    //         {text: "5%", "correct": false},
    //         {text: "10%", "correct": false},
    //         {text: "20%", "correct": true}
    //     ]
    // },
    // {
    //     question: "How much oxygen does an average 50-year-old tree provide?",
    //     answers: [
    //         {text: "Enough for 1 person per year", "correct": false},
    //         {text: "Enough for 4 person per year", "correct": true},
    //         {text: "Enough for 8 person per year", "correct": false},
    //         {text: "Enough for 10 person per year", "correct": false}
    //     ]
    // },
    // {
    //     question: "When was the first earth day celebrated?",
    //     answers: [
    //         {text: "1970", "correct": true},
    //         {text: "1985", "correct": false},
    //         {text: "1990", "correct": false},
    //         {text: "2005", "correct": false}
    //     ]
    // },
    // {
    //     question: "In its lifetime, one reusable bag can prevent the use of how many plastic bags?",
    //     answers: [
    //         {text: "50", "correct": false},
    //         {text: "300", "correct": false},
    //         {text: "600", "correct": true},
    //         {text: "1000", "correct": false}
    //     ]
    // },
    // {
    //     question: "What percent of Earths water can be used by humans?",
    //     answers: [
    //         {text: "Less than one percent", "correct": true},
    //         {text: "Less than five percent", "correct": false},
    //         {text: "Less than ten percent", "correct": false},
    //         {text: "Less than fifteen percent", "correct": false}
    //     ]
    // },
    // {
    //     question: "Which of these species are threatened by global warming?",
    //     answers: [
    //         {text: "Koala", "correct": false},
    //         {text: "Clownfish", "correct": false},
    //         {text: "Arctic fox", "correct": false},
    //         {text: "All of the above", "correct": true}
    //     ]
    // },
    // {
    //     question: "What is most frequently found in beach clean-ups?",
    //     answers: [
    //         {text: "Glass", "correct": false},
    //         {text: "Shoes", "correct": false},
    //         {text: "Pieces of Plastic", "correct": true},
    //         {text: "Jewellery", "correct": false}
    //     ]
    // }
]

// Event listener for the next button
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

startGame()

// Flips the card
function flipCard() {
  let qCard = document.getElementById("question-card")  
  qCard.classList.add("flipped")
}

// Starts the game
function startGame() {
    flipCard()
    shuffledQuestions = questionlist.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

// Sets the next random question
function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

// Shows the randomly selected question
function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn', 'question-btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }else{
        button.dataset.wrong = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

// Resets button states
function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

// Checks if the selected answer is right
function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  const wrong = selectedButton.dataset.wrong

  if(correct){
    rightAnswers += 1
    document.getElementById("answers-score").innerHTML = rightAnswers;
  }else if(wrong){
    drinks += 1
    document.getElementById("drinks-score").innerHTML = drinks;
  }

  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })

  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    document.cookie = 'drinks='+drinks;
    document.cookie = 'answers='+rightAnswers;
    console.log(document.cookie);
    ENDButton.classList.remove('hide')
  }
}

// Sets correct or wrong status to answers
function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

// Clears correct or wrong status from answers
function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}
