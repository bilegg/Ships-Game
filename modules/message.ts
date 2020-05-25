import log from './log';

export default class Message {
    @log
    showMessage(hit: boolean) {
        let tableHit = {
            messages: ["Nice !", "You did it !", "WOW !!", "Good shot !"],
        }
        let tableMiss = {
            messages: ["Darn it !", "Maybe next time", "Unlucky", "Damn it !"],
        }
        let randNum = Math.floor(Math.random() * 4)

        switch (hit) {
            case true:
                return tableHit.messages[randNum]
                break;
            case false:
                return tableMiss.messages[randNum]
                break;
        }

    }
}