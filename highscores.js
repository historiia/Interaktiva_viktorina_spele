const highScoresList = document.querySelector('#highScoresList')
const highScores = JSON.parse(localStorage.getItem('highScores')) || []

highScores.sort((a, b) => b.score - a.score); // Sort scores in descending order

highScoresList.innerHTML = highScores.map(score => {
    return `<li class='high-score'>${score.name} - ${score.score} punkti</li>`
}).join('')