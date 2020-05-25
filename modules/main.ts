import bPlayerLeft from './bPlayerLeft';
import bPlayerRight from './bPlayerRight';
import message from './message';

class BuildBoard {  

    botBoard: number[][] = bPlayerLeft.botTab;
    playerBoard: number[][] = bPlayerRight.mainTable;
    playerBoardDiv: HTMLDivElement = bPlayerRight.PlayerBoard();
    _this = this;
    startGame: boolean = false;

    constructor(init?: boolean) {
        if (init) gameplay.startGame = true;
    }

    CreatePage() {
        let bBot = document.createElement("div");
        let _this = this;
        bBot.id = "bBot";

        for (let i = 1; i < this.botBoard.length - 1; i++) {    // creating board
            for (let n = 1; n < this.botBoard[i].length - 1; n++) {
                let newDiv = document.createElement("div");
                newDiv.setAttribute('data-used', "false");
                newDiv.id = i + "_" + n + "_";

                newDiv.addEventListener('click', function () {
                    if (newDiv.dataset.used == "false") {
                        gameplay.OneShot(this.id, true);
                    }
                })

                // border creation
                if (n == 1 && i == 1) newDiv.className = "whiteField-1" ;
                else if (n != 1 && i == 1) newDiv.className = "whiteField-2";
                else if (n == 1 && i != 1) newDiv.className = "whiteField-3";
                else newDiv.className = "whiteField-4";

                bBot.appendChild(newDiv);
            }

        }
        bPlayerLeft.ShipCreate();

        document.body.appendChild(bBot);
        document.body.appendChild(this.playerBoardDiv);
    }
}


// * ------------------------------------------------------------------

// * ---------------------------------------------------------------
const gameplay = {
    startGame: false,
    currentPlayer: true, // ! true - player, false - bot
    _buildBoard: new BuildBoard(),
    button: {
        AppendButton: function (): HTMLButtonElement {
            let button = document.createElement('button')
            button.className = "button"
            button.innerHTML = "Start game"
            button.addEventListener('click', function () {
                gameplay.button.StartGame()
            })

            return button
        },
        DeleteButton: function (button: HTMLButtonElement) {
            document.body.removeChild(button)
        },
        StartGame: function () {
            gameplay.button.DeleteButton(document.getElementsByTagName('button')[0])

            gameplay.startGame = true
        }
    },
    CheckIfWin: function (playerTab: number[][], botTab: number[][]) {
        let botHasWon = true
        let playerHasWon = true

        for (let y = 0; y < botTab.length; y++) {
            for (let x = 0; x < botTab[y].length; x++) {
                if (botTab[y][x] == 1) playerHasWon = false
                if (playerTab[y][x] == 1) botHasWon = false
            }
        }

        if (botHasWon) {
            setTimeout(function () {
                document.getElementById("winBox")!.innerHTML = "Bot Won<br>The Game"
                document.getElementById("winBox")!.style.display = "block"
                document.getElementsByClassName('hidder')[0].setAttribute("style", "display:block");
            }, 1500)
        }
        else if (playerHasWon) {
            setTimeout(function () {
                document.getElementById("winBox")!.innerHTML = "Player Won<br>The Game"
                document.getElementById("winBox")!.style.display = "block"
                document.getElementsByClassName('hidder')[0].setAttribute("style", "display:block");
            }, 1500)
        }

    },
    OneShot: function (blockID: string, player: boolean) {
        if (bPlayerLeft.shipTab.length == 0 && gameplay.startGame) {
            if (this._buildBoard.botBoard == undefined) this._buildBoard.botBoard = [[1]]
            let x = Number(blockID.split("_")[0])
            let y = Number(blockID.split("_")[1])

            gameplay.currentPlayer = player

            if (gameplay.currentPlayer) { // player's turn
                let consoleLogger = new message

                if (this._buildBoard.botBoard[x][y] == 1) {
                    document.getElementById(x + "_" + y + "_")!.classList.add("g");
                    this._buildBoard.botBoard[x][y] = 3
                    consoleLogger.showMessage(true)
                }
                else {
                    gameplay._buildBoard.botBoard[x][y] = 3
                    document.getElementById(x + "_" + y + "_")!.style.backgroundColor = 'rgba(192,192,192,0.3)';
                    consoleLogger.showMessage(false)
                }

                document.getElementById(x + "_" + y + "_")!.dataset.used = "true"
                document.getElementsByClassName('hidder')[0].setAttribute("style", "display:block");
                document.getElementById('ann')!.innerText = "Bot"

                setTimeout(function () {
                    gameplay.OneShot(blockID, false)
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

            this.CheckIfWin(gameplay._buildBoard.playerBoard, gameplay._buildBoard.botBoard)
        }
    }
}

// * ---------------------------------------------------------------

export default gameplay

// * Initialization 

document.addEventListener("DOMContentLoaded", function (event) {
    let divBoard = new BuildBoard;

    divBoard.CreatePage();
});
