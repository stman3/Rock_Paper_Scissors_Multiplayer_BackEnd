const Player =require('./Player')
class Room{
    constructor(roomNo){
        this.roomNo=roomNo
        this.Players=[]
        console.log(`room have been resive with number: ${roomNo}`)
    }
    
    getRoomNO(){
        return this.roomNo
    }

    addPlayer(socketID,PlayerName,playerRank,playerPoint){
        this.Players.push(new Player(socketID,PlayerName,playerRank,playerPoint))
    }

    getPlayerNo(){
        return this.Players.length
    }

}





module.exports = Room