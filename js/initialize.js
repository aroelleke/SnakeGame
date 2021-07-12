import game from "./game.js"



function initialize() {
    document.getElementById("difficulty").addEventListener("input", (event) => { game.changeDifficulty(event.target.value) })
    document.getElementById("startGame").addEventListener("click", () => { game.startGame() })
    document.getElementById("pauseGame").addEventListener("click", () => { game.pauseGame() })
    document.getElementById("resetGame").addEventListener("click", () => { game.resetGame() })

    var gameContainer = document.getElementById("gameContainer")

    var dimensions = getDimensions(gameContainer)

    var amountX = Math.round(dimensions.width / 21)
    var amountY = Math.round(dimensions.height / 21)
    document.documentElement.style.setProperty("--game-tile-width", "20px")
    document.documentElement.style.setProperty("--game-tile-height", "20px")
    document.documentElement.style.setProperty("--game-tiles-amountY", amountY)
    document.documentElement.style.setProperty("--game-tiles-amountX", amountX)


    for (let index = 0; index < amountX; index++) {
        for (let index2 = 0; index2 < amountY; index2++) {
            gameContainer.appendChild(createTileElement(index2, index))
        }
    }
}

function createTileElement(x, y) {
    var tileElement = document.createElement("div")
    tileElement.id = `tile-x${x}-y${y}`
    tileElement.className = "gameTile"
    return tileElement
}


function getDimensions(element) {
    var height = element.offsetHeight
    var width = element.offsetWidth

    return { height, width }
}

export default initialize