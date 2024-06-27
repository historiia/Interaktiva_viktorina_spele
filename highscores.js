const highScoresList = document.querySelector('#highScoresList')
const highScores = JSON.parse(localStorage.getItem('highScores')) || []

highScores.sort((a, b) => b.score - a.score); // Sašķiro rezultātus dilstošā secībā

highScoresList.innerHTML = highScores.map(score => { // Pievieno rezultātus pie rezultātu tabulas
    return `<li class='high-score'>${score.name} - ${score.score} punkti</li>`
}).join('')