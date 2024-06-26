const question = document.querySelector('#jautajums')
const choices = Array.from(document.querySelectorAll('.atbilde-text'))
const progressText = document.querySelector('#progressText')
const scoreText = document.querySelector('#score')
const progressBarFull = document.querySelector('#progressBarFull')

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let avaiableQuestions = []

// List of questions, answers and correct answer.
let questions = [
    {
        question: 'Kurā gadā Latvija atguva neatkarību no Padomju Savienības?',
        choice1: '1989',
        choice2: '1991',
        choice3: '1987',
        choice4: '1990',
        answer: 2
    },
    {
        question: 'Kuru kultūrvēsturisko novadu sauc par zilo ezeru zemi?',
        choice1: 'Vidzeme',
        choice2: 'Zemgale',
        choice3: 'Latgale',
        choice4: 'Kurzeme',
        answer: 3
    },
    {
        question: 'Kurš ir trešais Latvijas prezidents?',
        choice1: 'Gustavs Zemgals',
        choice2: 'Jānis Čakste',
        choice3: 'Kārlis Ulmanis',
        choice4: 'Alberts Kviesis',
        answer: 4
    },
    {
        question: 'Kurā gadā Latvija pievienojās NATO?',
        choice1: '2004',
        choice2: '2006',
        choice3: '2014',
        choice4: '2016',
        answer: 1
    },
    {
        question: 'Kura ir augstākā virsotne Latvijā?',
        choice1: 'Zilaiskalns',
        choice2: 'Gaiziņkalns',
        choice3: 'Sirdskalns',
        choice4: 'Greizais kalns',
        answer: 2
    },
    {
        question: 'Kura ir vecākā Latvijas pilsēta?',
        choice1: 'Lubāna',
        choice2: 'Lielvārde',
        choice3: 'Ludza',
        choice4: 'Liepāja',
        answer: 3
    },
    {
        question: 'Kāds ir Latvijas nacionālais zieds?',
        choice1: 'Margrietiņa',
        choice2: 'Baltais āboliņš',
        choice3: 'Kumelīte',
        choice4: 'Pīpene',
        answer: 4
    },
    {
        question: 'Kurā gadā Latvija pievienojās Eiropas Savienībai?',
        choice1: '2004',
        choice2: '2005',
        choice3: '2006',
        choice4: '2007',
        answer: 1
    },
    {
        question: 'Kāds ir Latvijas nacionālais putns?',
        choice1: 'Dzērve',
        choice2: 'Baltā cielava',
        choice3: 'Melnais stārķis',
        choice4: 'Lakstīgala',
        answer: 2
    },
    {
        question: 'Kurā gadā dibināta Rīga?',
        choice1: '1210',
        choice2: '1200',
        choice3: '1201',
        choice4: '1211',
        answer: 3
    }
]

const SCORE_POINTS = 1
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    avaiableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(avaiableQuestions.length == 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++;
    progressText.innerText = `${questionCounter}. jautājums no ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionIndex = Math.floor(Math.random()* avaiableQuestions.length)
    currentQuestion = avaiableQuestions[questionIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice =>{
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    });

    avaiableQuestions.splice(questionIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return 

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectAnswer = selectedChoice.dataset['number']

        let classToApply = selectAnswer == currentQuestion.answer ? 'correct' : 'incorrect' // Izvēlas atbildes iekrāsošanas krāsu.

        if(classToApply == 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score+=num
    scoreText.innerText = score
}

startGame()