import createTable from './createTable';
import bPlayerLeft from './bPlayerLeft';

const bPlayerRight = {
    mainTable: createTable(12),
    shipDirection: true, //! true - right, false - down

    pickedShip: bPlayerLeft.pickedShip,
    playerBoard: function (): HTMLDivElement {
        let holder = document.createElement("div")
        holder.className = "bPlayerRight"
        let _this = this
        for (let y = 1; y < this.mainTable.length - 1; y++) {
            for (let x = 1; x < this.mainTable.length - 1; x++) {
                let singleDiv = document.createElement('div')
                singleDiv.id = x + "_" + y
                singleDiv.classList.add("dPlayerRight");
                singleDiv.addEventListener("mouseenter", function () {
                    _this.boardHover(true, singleDiv, false)
                })
                singleDiv.addEventListener("mouseleave", function () {
                    _this.boardHover(false, singleDiv, false)
                })
                singleDiv.addEventListener("contextmenu", function (ev) {
                    ev.preventDefault()
                    _this.rightClick(singleDiv, bPlayerRight.shipDirection)
                })
                singleDiv.addEventListener("click", function (ev) {
                    _this.leftClick(singleDiv)
                })

                if (x == 1 && y == 1) singleDiv.setAttribute("style", 'border-left:1px solid black;border-top:1px solid black')
                else if (x == 1) singleDiv.setAttribute("style", 'border-left:1px solid black')
                else if (y == 1) singleDiv.setAttribute("style", 'border-top:1px solid black')

                holder.appendChild(singleDiv)
            }
        }

        return holder
    },
    rightClick: function (element: HTMLDivElement, shipDirection: boolean) {
        let el = element
        this.shipDirection = !this.shipDirection
        shipDirection = !shipDirection

        for (let i = 0; i < document.getElementsByClassName("dPlayerRight").length; i++) { document.getElementsByClassName("dPlayerRight")[i].classList.remove("green"); document.getElementsByClassName("dPlayerRight")[i].classList.remove("red"); }

        let x = Number(el.id.split("_")[0])
        let y = Number(el.id.split("_")[1])

        console.log(x, y)
        console.log(shipDirection)

        let tempX: number = x
        let tempY: number = y

        if (y - this.pickedShip.children.length < 0) {
            if (shipDirection == false) {
                for (let i = 0; i < this.pickedShip.children.length; i++) {
                    if (tempX + this.pickedShip.children.length > 11) tempY = y
                    let id = (tempX) + "_" + (tempY + i)
                    let currentDiv: HTMLElement = document.getElementById(id)!

                    if (this.canPutShip(tempX, tempY)) currentDiv.classList.add("green");
                    else currentDiv.classList.add("red");
                    tempX = x
                    tempY = y
                }
            }
        }
        if (x + this.pickedShip.children.length > 11 && y + this.pickedShip.children.length <= 11) {
            if (shipDirection) {
                for (let i = 0; i < this.pickedShip.children.length; i++) {
                    if (tempX + this.pickedShip.children.length > 11) tempX = 11 - this.pickedShip.children.length
                    console.log(tempX, tempY)
                    let id = (tempX + i) + "_" + (tempY)
                    let currentDiv: HTMLElement = document.getElementById(id)!

                    if (this.canPutShip(tempX, tempY)) currentDiv.classList.add("green");
                    else currentDiv.classList.add("red");
                    tempX = x
                    tempY = y
                }
            }
            else if (shipDirection == false) {
                for (let i = 0; i < this.pickedShip.children.length; i++) {
                    if (tempX + this.pickedShip.children.length > 11) tempY = y
                    console.log(tempX, tempY)
                    let id = (tempX) + "_" + (tempY + i)
                    let currentDiv: HTMLElement = document.getElementById(id)!

                    if (this.canPutShip(tempX, tempY)) currentDiv.classList.add("green");
                    else currentDiv.classList.add("red");
                    tempX = x
                    tempY = y
                }
            }
        }
        if (x + this.pickedShip.children.length > 11 && y + this.pickedShip.children.length > 11) {
            if (shipDirection) {
                for (let i = 0; i < this.pickedShip.children.length; i++) {
                    if (tempX + this.pickedShip.children.length > 11) tempX = 11 - this.pickedShip.children.length
                    console.log(tempX, tempY)
                    let id = (tempX + i) + "_" + (tempY)
                    let currentDiv: HTMLElement = document.getElementById(id)!

                    if (this.canPutShip(tempX, tempY)) currentDiv.classList.add("green");
                    else currentDiv.classList.add("red");
                    tempX = x
                    tempY = y
                }
            }
            else if (shipDirection == false) {
                for (let i = 0; i < this.pickedShip.children.length; i++) {
                    if (tempX + this.pickedShip.children.length > 11) tempY = 11 - this.pickedShip.children.length
                    console.log(tempX, tempY)
                    let id = (tempX) + "_" + (tempY + i)
                    let currentDiv: HTMLElement = document.getElementById(id)!

                    if (this.canPutShip(tempX, tempY)) currentDiv.classList.add("green");
                    else currentDiv.classList.add("red");
                    tempX = x
                    tempY = y
                }
            }
        }
        if (x + this.pickedShip.children.length <= 11 && y + this.pickedShip.children.length > 11) {
            if (shipDirection) {
                for (let i = 0; i < this.pickedShip.children.length; i++) {
                    if (tempX + this.pickedShip.children.length > 11) tempX = 11 - this.pickedShip.children.length
                    console.log(tempX, tempY)
                    let id = (tempX + i) + "_" + (tempY)
                    let currentDiv: HTMLElement = document.getElementById(id)!

                    if (this.canPutShip(tempX, tempY)) currentDiv.classList.add("green");
                    else currentDiv.classList.add("red");
                    tempX = x
                    tempY = y
                }
            }
            else if (shipDirection == false) {
                for (let i = 0; i < this.pickedShip.children.length; i++) {
                    if (tempY + this.pickedShip.children.length > 11) tempY = 11 - this.pickedShip.children.length
                    console.log(tempX, tempY)
                    let id = (tempX) + "_" + (tempY + i)
                    let currentDiv: HTMLElement = document.getElementById(id)!

                    if (this.canPutShip(tempX, tempY)) currentDiv.classList.add("green");
                    else currentDiv.classList.add("red");
                    tempX = x
                    tempY = y
                }
            }
        }

        if (x + this.pickedShip.children.length <= 11 && y + this.pickedShip.children.length <= 11) this.boardHover(true, el, false)

    },
    leftClick: function (element: HTMLDivElement) {
        if (bPlayerLeft.shipTab.length == 0) alert("Strzelaj komputerowi nie sobie baranie xd")

        let x = Number(element.id.split("_")[1])
        let y = Number(element.id.split("_")[0])
        if (this.canPutShip(y, x)) {
            switch (this.shipDirection) {
                case true:
                    for (let i = 0; i < this.pickedShip.children.length; i++) {
                        if (y + this.pickedShip.children.length > 11) y = 11 - bPlayerLeft.pickedShip.children.length
                        this.mainTable[x][y + i] = 1
                    }
                    break;
                case false:
                    for (let i = 0; i < this.pickedShip.children.length; i++) {
                        if (x + this.pickedShip.children.length > 11) x = 11 - bPlayerLeft.pickedShip.children.length
                        this.mainTable[x + i][y] = 1
                    }
                    break;
            }
            if (bPlayerLeft.shipTab.length != 0 && bPlayerLeft.pickedShip.className != "") bPlayerLeft.shipDelete(bPlayerLeft.pickedShip)
            this.paintBlue()
        }

    },
    paintBlue: function () {
        for (let x = 1; x < this.mainTable.length - 1; x++) {
            for (let y = 1; y < this.mainTable.length - 1; y++) {
                if (this.mainTable[x][y] == 1) document.getElementById(y + "_" + x)!.classList.add("blue")
            }
        }

    },
    boardHover: function (colored: boolean, element: HTMLDivElement, cornerChange: boolean, cornerX?: number, cornerY?: number) {
        let _this = this

        let x = Number(element.id.split("_")[0])
        let y = Number(element.id.split("_")[1])
        if (cornerChange) { x = cornerX!; y = cornerY! }
        _this.pickedShip = bPlayerLeft.pickedShip

        switch (_this.shipDirection) {
            case true:
                for (let i = 0; i < _this.pickedShip.children.length; i++) {
                    if (x + _this.pickedShip.children.length > 11 && cornerChange == false) x = 11 - _this.pickedShip.children.length
                    let id = (x + i) + "_" + (y)
                    let currentDiv: HTMLElement = document.getElementById(id)!

                    if (colored) {
                        if (this.canPutShip(x, y)) currentDiv.classList.add("green");
                        else currentDiv.classList.add("red");
                    }
                    else {
                        if (this.canPutShip(x, y)) currentDiv.classList.remove("green");
                        else currentDiv.classList.remove("red");
                    }
                }
                break;
            case false:
                for (let i = 0; i < _this.pickedShip.children.length; i++) {
                    if (y + _this.pickedShip.children.length > 11 && cornerChange == false) y = 11 - _this.pickedShip.children.length
                    let id = (x) + "_" + (y + i)
                    let currentDiv: HTMLElement = document.getElementById(id)!

                    if (colored) {
                        if (this.canPutShip(x, y)) currentDiv.classList.add("green");
                        else currentDiv.classList.add("red");
                    }
                    else {
                        if (this.canPutShip(x, y)) currentDiv.classList.remove("green");
                        else currentDiv.classList.remove("red");
                    }
                }
                break;
        }
    },
    canPutShip: function (propX: number, propY: number): boolean {
        let y = propX
        let x = propY

        let isOk: boolean = true

        for (var z = 0; z < this.pickedShip.children.length; z++) {
            if (this.shipDirection) {
                if (this.mainTable[x][y + z] == 1 || this.mainTable[x][y + z - 1] == 1 || this.mainTable[x + 1][y + z - 1] == 1 || this.mainTable[x + 1][y + z] == 1 || this.mainTable[x + 1][y + z + 1] == 1 ||
                    this.mainTable[x][y + z + 1] == 1 || this.mainTable[x - 1][y + z + 1] == 1 || this.mainTable[x - 1][y + z] == 1 || this.mainTable[x - 1][y + z - 1] == 1) {
                    isOk = false
                }
            }
            else {
                if (this.mainTable[x + z][y] == 1 || this.mainTable[x + z - 1][y] == 1 || this.mainTable[x + z - 1][y + 1] == 1 || this.mainTable[x + z][y + 1] == 1 || this.mainTable[x + z + 1][y + 1] == 1 ||
                    this.mainTable[x + z + 1][y] == 1 || this.mainTable[x + z + 1][y - 1] == 1 || this.mainTable[x + z][y - 1] == 1 || this.mainTable[x + z - 1][y - 1] == 1) {
                    isOk = false
                }
            }
        }

        if (isOk == false) return false
        else return true
    }

}

export default bPlayerRight