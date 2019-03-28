import bPlayerLeft from './modules/bPlayerLeft';
import bPlayerRight from './modules/bPlayerRight';
import message from './modules/message';
import Message from './modules/message';

function log(mode: boolean) { // this is the decorator factory
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        if (mode) console.log("Ładnie")
        else console.log("Gowno")
    };
}

class buildBoard {

    botBoard: number[][] = bPlayerLeft.botTab
    playerBoard: number[][] = bPlayerRight.mainTable
    playerBoardDiv: HTMLDivElement = bPlayerRight.playerBoard()
    _this = this
    startGame: boolean = false

    constructor(init?: boolean) {
        if (init) gameplay.startGame = true
    }

    @log(false)
    useFUCKINGUSELESSDECORATORFFS() {
        console.log("very usefull")
    }


    createPage() {
        let bBot = document.createElement("div")
        bBot.id = "bBot"
        let _this = this

        for (let i = 1; i < this.botBoard.length - 1; i++) {

            for (let n = 1; n < this.botBoard[i].length - 1; n++) {
                let newDiv = document.createElement("div")
                newDiv.setAttribute('data-used', "false")
                newDiv.id = i + "_" + n + "_"

                newDiv.addEventListener('click', function () {
                    if (newDiv.dataset.used == "false") {
                        gameplay.oneShot(this.id, true)
                    }
                })

                //tworzenie borderów
                if (n == 1 && i == 1) newDiv.className = "whiteField-1"
                else if (n != 1 && i == 1) newDiv.className = "whiteField-2"
                else if (n == 1 && i != 1) newDiv.className = "whiteField-3"
                else newDiv.className = "whiteField-4"

                //zamalowanie bloku
                //if (this.botBoard[i][n] == 1) newDiv.style.backgroundColor = "black"
                bBot.appendChild(newDiv)
            }

        }

        bPlayerLeft.shipCreate()

        document.body.appendChild(bBot)
        document.body.appendChild(this.playerBoardDiv)
    }

}


// * ------------------------------------------------------------------

// * ---------------------------------------------------------------
const gameplay = {
    startGame: false,
    currentPlayer: true, // ! true - gracz, false - komputer
    _buildBoard: new buildBoard(),
    button: {
        appendButton: function (): HTMLButtonElement {
            let button = document.createElement('button')
            button.className = "button"
            button.innerHTML = "Start game"
            button.addEventListener('click', function () {
                gameplay.button.startGame()
            })

            return button
        },
        deleteButton: function (button: HTMLButtonElement) {
            document.body.removeChild(button)
        },
        startGame: function () {
            gameplay.button.deleteButton(document.getElementsByTagName('button')[0])

            gameplay.startGame = true
        }
    },
    checkIfWin: function (playerTab: number[][], botTab: number[][]) {
        let win: boolean;
        let winner: boolean // player:true

        let noOneBot = true
        let noOnePlayer = true

        for (let y = 0; y < botTab.length; y++) {
            for (let x = 0; x < botTab[y].length; x++) {
                if (botTab[y][x] == 1) noOnePlayer = false
                if (playerTab[y][x] == 1) noOneBot = false
            }
        }

        if (noOneBot) {
            setTimeout(function () {
                document.getElementById("winBox")!.innerHTML = "Bot Won<br>The Game"
                document.getElementById("winBox")!.style.display = "block"
                document.getElementsByClassName('hidder')[0].setAttribute("style", "display:block");
            }, 1500)
        }
        else if (noOnePlayer) {
            setTimeout(function () {
                document.getElementById("winBox")!.innerHTML = "Player Won<br>The Game"
                document.getElementById("winBox")!.style.display = "block"
                document.getElementsByClassName('hidder')[0].setAttribute("style", "display:block");
            }, 1500)
        }

    },
    oneShot: function (blockID: string, player: boolean) {
        if (bPlayerLeft.shipTab.length == 0 && gameplay.startGame) {
            if (this._buildBoard.botBoard == undefined) this._buildBoard.botBoard = [[1]]
            let x = Number(blockID.split("_")[0])
            let y = Number(blockID.split("_")[1])

            gameplay.currentPlayer = player

            if (gameplay.currentPlayer) { // tura gracza
                let consoleLogger = new message

                if (this._buildBoard.botBoard[x][y] == 1) {
                    document.getElementById(x + "_" + y + "_")!.classList.add("g");
                    this._buildBoard.botBoard[x][y] = 3
                    consoleLogger.showMessage(true, true)
                }
                else {
                    gameplay._buildBoard.botBoard[x][y] = 3
                    document.getElementById(x + "_" + y + "_")!.style.backgroundColor = 'rgba(192,192,192,0.3)';
                    consoleLogger.showMessage(true, false)
                }

                document.getElementById(x + "_" + y + "_")!.dataset.used = "true"
                document.getElementsByClassName('hidder')[0].setAttribute("style", "display:block");
                document.getElementById('ann')!.innerText = "Bot"

                setTimeout(function () {
                    gameplay.oneShot(blockID, false)
                }, 1000)
            }
            else {
                let pass: boolean;
                let randX: number; 
                let randY: number;
                do {
                    randX = Math.floor(Math.random() * 10) + 1
                    randY = Math.floor(Math.random() * 10) + 1

                    if (document.getElementById(randY + "_" + randX)!.dataset.used == "true") pass = false
                    else pass = true
                } while (pass == false)


                if (gameplay._buildBoard.playerBoard[randX][randY] == 1) {
                    document.getElementById(randY + "_" + randX)!.classList.add("g");
                    gameplay._buildBoard.playerBoard[randX][randY] = 3
                }
                else {
                    gameplay._buildBoard.playerBoard[randX][randY] = 3
                    document.getElementById(randY + "_" + randX)!.style.backgroundColor = 'rgba(192,192,192,0.3)';
                }

                document.getElementsByClassName('hidder')[0].setAttribute("style", "display:none");
                document.getElementById('ann')!.innerText = "Player"
                document.getElementById(randY + "_" + randX)!.dataset.used = "true"

            }

            this.checkIfWin(gameplay._buildBoard.playerBoard, gameplay._buildBoard.botBoard)
        }
    }
}

// * ---------------------------------------------------------------

export default gameplay

// * Inicjacja 

document.addEventListener("DOMContentLoaded", function (event) {
    let divBoard = new buildBoard

    divBoard.createPage()

});
