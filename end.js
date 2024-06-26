const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore')
const highScores = JSON.parse(localStorage.getItem('highScores'))|| []
const MAX_HIGH_SCORES = 5

finalScore.innerText = mostRecentScore

username.addEventListener('keyup', () => { //Sabglabāt pogas nospiešanas atļaušana.
    saveScoreBtn.disabled = !username.value
})

saveHighScore = e => {
    e.preventDefault() // Nospiežot pogu nav automātiskais refresh.
    const score = { // atgriež lietotāja username un rezultātu
        score: mostRecentScore,
        name: username.value
    }
    
    highScores.push(score) //Pievieno score pie highScore list
    highScores.sort((a,b) => b.score - a.score) // Sakārto rezultātus
    highScores.splice(MAX_HIGH_SCORES)

    localStorage.setItem('highScores', JSON.stringify(highScores))
    //window.location.assign('/index.html') // Atgriežas uz Sākumlapu
}