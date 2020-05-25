let CreateTable: (size: number) => number[][] =
    function (size: number): number[][] {
        let mainTable: number[][] = []

        for (let i = 0; i < size; i++) {
            let arr: number[] = []
            mainTable.push(arr)
            for (let n = 0; n < size; n++) {
                let zero: number = 0
                mainTable[i].push(zero)
            }
        }

        return mainTable
    };

export default CreateTable