import delay from "./delay.js"



class Game {
    amountX
    amountY

    availableDifficulties = [0.29, 0.22, 0.15, 0.08, 0.01]
    difficulty = 2

    snake = [{ x: 2, y: 2 }, { x: 2, y: 3 }]
    food = []
    points = 0

    currentMovement = "down"
    nextMovement = ""

    pause = false
    lost = false

    round = 0


    async game() {
        this.round++
        if (this.pause || this.lost) return
        this.printGame()
        this.moveSnake()
        if (this.findDuplicate(this.snake)) {
            this.looseGame()
            return
        }
        this.checkIfFoodIsFound()
        this.displayPoints()
        await delay(this.availableDifficulties[this.difficulty] * 1000)
        this.game()
    }

    moveSnake() {
        if (this.nextMovement.length == 0) this.nextMovement = this.currentMovement
        if (
            this.currentMovement == "down" && this.nextMovement == "up" ||
            this.currentMovement == "up" && this.nextMovement == "down" ||
            this.currentMovement == "left" && this.nextMovement == "right" ||
            this.currentMovement == "right" && this.nextMovement == "left"
        ) this.nextMovement = this.currentMovement

        for (let index = 0; index < this.snake.length - 1; index++) {
            this.snake[index].x = this.snake[index + 1].x
            this.snake[index].y = this.snake[index + 1].y
        }

        if (this.nextMovement == "up") {
            if (this.snake[this.snake.length - 1].y == 0) this.snake[this.snake.length - 1].y = this.amountY - 1
            else this.snake[this.snake.length - 1].y--
        } else if (this.nextMovement == "down") {
            if (this.snake[this.snake.length - 1].y == this.amountY - 1) this.snake[this.snake.length - 1].y = 0
            else this.snake[this.snake.length - 1].y++
        } else if (this.nextMovement == "left") {
            if (this.snake[this.snake.length - 1].x == 0) this.snake[this.snake.length - 1].x = this.amountX - 1
            else this.snake[this.snake.length - 1].x--
        } else if (this.nextMovement == "right") {
            if (this.snake[this.snake.length - 1].x == this.amountX - 1) this.snake[this.snake.length - 1].x = 0
            else this.snake[this.snake.length - 1].x++
        }
        this.currentMovement = this.nextMovement
        this.nextMovement = ""
    }

    findDuplicate(array) {
        var foundDuplicate = false
        for (let index = 0; index < array.length; index++) {
            for (let index2 = 0; index2 < array.length; index2++) {
                if (index == index2) continue
                foundDuplicate = array[index].x == array[index2].x && array[index].y == array[index2].y
                if (foundDuplicate) break
            }
            if (foundDuplicate) break
        }
        return foundDuplicate
    }

    checkIfFoodIsFound() {
        var foundFood = this.snake.find((element) => { return element.x == this.food.x && element.y == this.food.y })
        if (foundFood) {
            this.points++
            this.snake.unshift({ x: this.snake[0].x, y: this.snake[0].y })
            this.spawnFood()
        }
    }

    spawnFood() {
        var newFood = {
            x: Math.round(Math.random() * (this.amountX - 1)) + 1,
            y: Math.round(Math.random() * (this.amountY - 1)) + 1
        }
        if (this.food.x == newFood.x && this.food.y == newFood.y) {
            return spawnFood()
        }
        this.food = newFood
    }

    printGame() {
        document.getElementById("gameContainer").childNodes.forEach((element, index) => {
            if (!element.id) { return }
            var elementPosition = element.id.split("-")
            var currentPosition = {
                x: parseInt(elementPosition[0].slice(1, elementPosition[0].length)),
                y: parseInt(elementPosition[1].slice(1, elementPosition[1].length))
            }
            var isSnake = this.snake.filter((element) => {
                return element.x == currentPosition.x && element.y == currentPosition.y
            }).length
            if (isSnake != 0) {
                element.classList = "gameTile snake"
            } else {
                if (currentPosition.x == this.food.x && currentPosition.y == this.food.y) {
                    element.classList = "gameTile food"
                } else {
                    element.classList = "gameTile"
                }
            }
        })
    }

    displayPoints() {
        document.getElementById("gamePointsCounter").innerHTML = this.points
    }

    startGame() {
        this.pause = false
        this.game()
    }

    pauseGame() {
        this.pause = true
    }

    resetGame() {
        this.snake = [
            { x: 2, y: 2 },
            { x: 2, y: 3 }
        ]
        this.currentMovement = "down"
        this.nextMovement = ""
        this.pause = true
        this.printGame()
    }

    looseGame() {
        console.log("snake", this.snake)
        this.snake.forEach(element => {
            document.getElementById(`x${element.x}-y${element.y}`).classList = "gameTile lost"
        })
        document.getElementById(`x${this.food.x}-y${this.food.y}`).classList = "gameTile"
    }

    changeDifficulty(value) {
        this.difficulty = value
    }

    getNextMovement(code) {
        if (code == "ArrowLeft") {
            this.nextMovement = "left"
        } else if (code == "ArrowUp") {
            this.nextMovement = "up"
        } else if (code == "ArrowRight") {
            this.nextMovement = "right"
        } else if (code == "ArrowDown") {
            this.nextMovement = "down"
        }
        console.log("nextMovement:", this.nextMovement)
    }

    setAmount(x, y) {
        this.amountX = x
        this.amountY = y
    }
}

export default Game