import log from './log';

export default class Message {
    @log
    showMessage(mode: boolean, hit: boolean) { //mode true - nice , false - vulgar
        let tableHit = {
            nice: ["Nice !", "You did it !", "WOW !!", "Good shot !"],
            vulgar: ["Fuck yeah !", "Sink that fucker", "Drown you bitch", "Shot it just like i did yesterday on your mom's face"]
        }
        let tableMiss = {
            nice: ["Darn it !", "Maybe next time", "Unlucky", "Damn it !"],
            vulgar: ["FUCK THIS SHIT IM OUT", "WTF WHAT ARE THE CHANCES ?", "B U L L S H I T", "MOTHERFUCKER !"]
        }
        let randNum = Math.floor(Math.random() * 4)

        if (mode) {
            switch (hit) {
                case true:
                    return tableHit.nice[randNum]
                    break;
                case false:
                    return tableMiss.nice[randNum]
                    break;
            }
        }
        else {
            switch (hit) {
                case true:
                    return tableHit.vulgar[randNum]
                    break;
                case false:
                    return tableMiss.vulgar[randNum]
                    break;
            }
        }

    }
}