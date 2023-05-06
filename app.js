'use strict';
// Function display 
const displayMessage = (mess) => {
    messageElement.textContent = mess
}

const displayScore = (score) => {
    scoreElement.textContent = score
}

const displayBodyBackground = (color) => {
    bodyElement.style.backgroundColor = color
}
// Con số random
let number = Math.trunc(Math.random() * 20) + 1
// Các DOM
const bodyElement = document.querySelector('body')
const numberElement = document.querySelector('.number')
const btnCheckElement = document.querySelector('.check')
const btnAgainElement = document.querySelector('.again')
const inputGuessElement = document.querySelector('.guess')
const messageElement = document.querySelector('.message')
const scoreElement = document.querySelector('.score')
const highscoreElement = document.querySelector('.highscore')

// Khởi tạo score
let score = 10
displayScore(score)
// Lưu trữ dữ liệu trong localStorage (hightscore)
if (localStorage.getItem('hightscore') == null) {
    localStorage.setItem('hightscore', 0);
} else {
    highscoreElement.textContent = localStorage.getItem("hightscore")
}
// Sự kiện click vào nút check
btnCheckElement.addEventListener('click', (e) => {
    const guess = Number(inputGuessElement.value)
    if (guess <= 0) {
        displayMessage('❌ You must enter a number and the number must be greater than 0 ')
    } else if (guess !== number) {
        displayMessage(guess > number ? '⬆️ Too high' : '⬇️ Too Low')
        score--
        displayScore(score)
        if (score === 0) {
            displayMessage('😥 You lost, please click again')
            btnCheckElement.attributes
            btnCheckElement.classList.add('disabled')
            btnCheckElement.setAttribute('disabled', true);
            displayBodyBackground('#E63946')
        }
        displayBodyBackground('#222')
        numberElement.textContent = '?'
    } else if (guess === number) {
        displayMessage('😍 You guessed right')
        score++
        displayScore(score)
        displayBodyBackground('#76C893')
        numberElement.textContent = number
        number = Math.trunc(Math.random() * 20) + 1
        if (localStorage.getItem("hightscore") < score) {
            localStorage.setItem("hightscore", score);
            highscoreElement.textContent = localStorage.getItem("hightscore")
        }
    }
})

// Sự kiện click vào nút again
btnAgainElement.addEventListener('click', (e) => {
    displayMessage('Start guessing...')
    score = 10
    displayScore(score)
    inputGuessElement.value = null
    displayBodyBackground('#222')
})
