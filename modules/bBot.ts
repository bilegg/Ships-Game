import createTable from './createTable';

const bBot = {

    //* Wylosowanie jedynek (bot)
    checkSurrounding: function (shipSize: number, propTable: number[][]) {
        let x: number = 0;
        let y: number = 0;
        let index: number = shipSize - 1;
        let redo: boolean = true;
        let direction_down: boolean = false

        let randomize = function () {
            //losowanie kierunku
            if (Math.random() > 0.5) direction_down = true
            else direction_down = false

            switch (direction_down) {
                case true:
                    x = Math.floor(Math.random() * (11 - shipSize)) + 1
                    y = Math.floor(Math.random() * 10) + 1
                    break;
                case false:
                    x = Math.floor(Math.random() * 10) + 1
                    y = Math.floor(Math.random() * (11 - shipSize)) + 1
                    break;
            }
        }
        randomize()

        do {
            let isOk: boolean = true
            for (var z = 0; z < shipSize; z++) {
                if (direction_down) {
                    if (propTable[x + z][y] == 1 || propTable[x + z - 1][y] == 1 || propTable[x + z - 1][y + 1] == 1 || propTable[x + z][y + 1] == 1 || propTable[x + z + 1][y + 1] == 1 ||
                        propTable[x + z + 1][y] == 1 || propTable[x + z + 1][y - 1] == 1 || propTable[x + z][y - 1] == 1 || propTable[x + z - 1][y - 1] == 1) {
                        isOk = false
                    }
                }
                else {
                    if (propTable[x][y + z] == 1 || propTable[x][y + z - 1] == 1 || propTable[x + 1][y + z - 1] == 1 || propTable[x + 1][y + z] == 1 || propTable[x + 1][y + z + 1] == 1 ||
                        propTable[x][y + z + 1] == 1 || propTable[x - 1][y + z + 1] == 1 || propTable[x - 1][y + z] == 1 || propTable[x - 1][y + z - 1] == 1) {
                        isOk = false
                    }
                }
            }

            //Wyjście z pętli
            if (isOk == false) randomize()
            else redo = false

        } while (redo)


        let recur = function (times: number): boolean {
            if (times < 0) {
                return true
            }
            else {
                switch (direction_down) {
                    case true:
                        if (times == shipSize - 1) {
                            propTable[x + times + 1][y] = 2
                            propTable[x + times + 1][y + 1] = 2
                            propTable[x + times + 1][y - 1] = 2
                        }
                        if (times == 0) {
                            propTable[x + times - 1][y] = 2
                            propTable[x + times - 1][y + 1] = 2
                            propTable[x + times - 1][y - 1] = 2
                        }
                        propTable[x + times][y] = 1
                        propTable[x + times][y + 1] = 2
                        propTable[x + times][y - 1] = 2
                        break;
                    case false:
                        if (times == shipSize - 1) {
                            propTable[x][y + times + 1] = 2
                            propTable[x - 1][y + times + 1] = 2
                            propTable[x + 1][y + times + 1] = 2
                        }
                        if (times == 0) {
                            propTable[x][y + times - 1] = 2
                            propTable[x - 1][y + times - 1] = 2
                            propTable[x + 1][y + times - 1] = 2
                        }
                        propTable[x][y + times] = 1
                        propTable[x - 1][y + times] = 2
                        propTable[x + 1][y + times] = 2
                        break;
                }
                index = index - 1

                return recur(index)
            }
        }
        recur(index)

        return propTable

    },

    writeOnes: function (): number[][] {
        let mainTable: any = createTable(12)

        //wstawianie 4-masztowca
        mainTable = this.checkSurrounding(4, mainTable)

        //wstawianie 3-masztowców
        mainTable = this.checkSurrounding(3, mainTable)
        mainTable = this.checkSurrounding(3, mainTable)

        //wstawianie 2-masztowców
        mainTable = this.checkSurrounding(2, mainTable)
        mainTable = this.checkSurrounding(2, mainTable)
        mainTable = this.checkSurrounding(2, mainTable)

        //wstawianie 1-masztowców
        mainTable = this.checkSurrounding(1, mainTable)
        mainTable = this.checkSurrounding(1, mainTable)
        mainTable = this.checkSurrounding(1, mainTable)
        mainTable = this.checkSurrounding(1, mainTable)

        return mainTable
    },

}

export default bBot