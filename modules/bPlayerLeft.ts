import bBot from './bBot';
import gameplay from './../main';

const bPlayerLeft = {
    botTab: bBot.writeOnes(),
    shipTab: [4, 3, 3, 2, 2, 2, 1, 1, 1, 1],
    pickedShip: document.createElement("div"),
    ShipCreate: function () {
        let ships: HTMLDivElement[] = []

        //tworzenie divow
        for (let i = 0; i < this.shipTab.length; i++) {
            let ship = document.createElement("div")
            let _this = this
            ship.className = "sPlayerLeft"
            ship.setAttribute('picked', 'false');

            for (let x = 0; x < this.shipTab[i]; x++) {
                let div = document.createElement("div")

                div.addEventListener("click", function () {
                    _this.shipClick(ship)
                })
                div.addEventListener("mouseenter", function () {
                    _this.shipGlow(true, ship)
                })
                div.addEventListener("mouseleave", function () {
                    _this.shipGlow(false, ship)
                })
                div.className = "dPlayerLeft"
                ship.appendChild(div)
            }

            //pre-zaznaczenie 4-d
            if (i == 0) {
                for (let i = 0; i < ship.children.length; i++) ship.children[i].setAttribute("style", "background-color:blue");
                ship.setAttribute('picked', 'true');
                this.pickedShip = ship
            }


            ships.push(ship)
        }

        //dodawanie statkow do body
        for (let i = 0; i < ships.length; i++) {
            document.getElementsByClassName("bPlayerLeft")[0].appendChild(ships[i])
        }
    },
    ShipGlow: function (colorUp: boolean, ship: HTMLDivElement) {
        if (ship.getAttribute("picked") == "false") {
            if (colorUp) for (let i = 0; i < ship.children.length; i++) ship.children[i].setAttribute("style", "background-color:red");
            else for (let i = 0; i < ship.children.length; i++) ship.children[i].setAttribute("style", "background-color:white");
        }

        return ship
    },
    ShipClick: function (ship: HTMLDivElement) {
        for (let i = 0; i < ship.children.length; i++) ship.children[i].setAttribute("style", "background-color:blue");
        ship.setAttribute('picked', 'true');

        this.pickedShip.setAttribute('picked', 'false');
        for (let i = 0; i < this.pickedShip.children.length; i++) this.pickedShip.children[i].setAttribute("style", "background-color:white");
        this.pickedShip = ship


        return ship
    },
    ShipDelete: function (ship: HTMLDivElement) {
        this.shipTab.splice(this.shipTab.indexOf(ship.children.length), 1)
        this.pickedShip = document.createElement("div")
        document.body.getElementsByClassName("bPlayerLeft")[0].removeChild(ship)

        if (this.shipTab.length == 0) document.body.appendChild(gameplay.button.AppendButton())
    }
}

export default bPlayerLeft