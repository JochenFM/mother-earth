window.addEventListener('DOMContentLoaded', (event) => {
    saveScoreRef
});

const usernameRef = document.querySelector('#username');
const saveScoreRef= document.querySelector('#saveScoreBtn');
const finalScoreRef = document.querySelector('#finalScore');
const score = localStorage.getItem('score');
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const MaxHighScores = 5;
//Enter username
usernameRef.addEventListener('keyup', () => {
    saveScoreRef.disabled = !usernameRef.value;
});
//Game Scores
finalScoreRef.innerText = score;

saveHighScore = e => {
    e.preventDefault();
    //High Scores local storage
    const scoreRef = {
        score: score,
        name: usernameRef.value
    };
    highScores.push(scoreRef);
    highScores.sort( (a,b) => b.score - a.score)
    highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    
}

