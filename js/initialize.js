import Game from "./game.js"


var game = new Game()

var tileSize = 20
var tileGap = 1

function initialize() {
    document.getElementById("difficulty").addEventListener("input", (event) => { game.changeDifficulty(event.target.value) })
    document.addEventListener("keydown", (event) => { game.getNextMovement(event.code) })
    document.getElementById("startGame").addEventListener("click", () => { game.startGame() })
    document.getElementById("pauseGame").addEventListener("click", () => { game.pauseGame() })
    document.getElementById("resetGame").addEventListener("click", () => { game.resetGame() })

    var gameContainer = document.getElementById("gameContainer")
    var dimensions = getDimensions(gameContainer)
    game.setAmount(Math.round(dimensions.width / (tileSize + tileGap)), Math.round(dimensions.height / (tileSize + tileGap)))

    document.documentElement.style.setProperty("--game-tile-width", `${tileSize}px`)
    document.documentElement.style.setProperty("--game-tile-height", `${tileSize}px`)
    document.documentElement.style.setProperty("--game-tiles-amountY", game.amountY)
    document.documentElement.style.setProperty("--game-tiles-amountX", game.amountX)

    for (let index = 0; index < game.amountY; index++) {
        for (let index2 = 0; index2 < game.amountX; index2++) {
            gameContainer.appendChild(createTileElement(index2, index))
        }
    }
    game.spawnFood()
    game.printGame()
}

function createTileElement(x, y) {
    var tileElement = document.createElement("div")
    tileElement.id = `x${x}-y${y}`
    tileElement.className = "gameTile"
    return tileElement
}


function getDimensions(element) {
    var height = element.offsetHeight
    var width = element.offsetWidth

    return { height, width }
}

export default initialize