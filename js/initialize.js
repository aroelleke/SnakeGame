import game from "./game.js"



function initialize() {
    document.getElementById("difficulty").addEventListener("input", (event) => { game.changeDifficulty(event.target.value) })
    document.getElementById("startGame").addEventListener("click", () => { game.startGame() })
    document.getElementById("pauseGame").addEventListener("click", () => { game.pauseGame() })
    document.getElementById("resetGame").addEventListener("click", () => { game.resetGame() })

    var gameContainer = document.getElementById("gameContainer")

    for (let index = 0; index < 50; index++) {
        for (let index2 = 0; index2 < 50; index2++) {
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