

const availableDifficulties = [1, 0.8, 0.6, 0.4, 0.2]
var difficulty = 2
var snakeSize = 2





function changeDifficulty(value) {
    difficulty = value
}

function startGame() { }

function pauseGame() { }

function resetGame() {
    snakeSize = 2
}


export default { changeDifficulty, startGame, pauseGame, resetGame }