class Player{
    constructor(socketID,PlayerName,playerRank,playerPoint){
        this.socketID=socketID
        this.PlayerName=PlayerName
        this.playerRank=playerRank
        this.playerPoint=playerPoint
    }

    getPlayer(){
        return Player
    }
    getsocketID(){
        return this.socketID
    }
    setPlayerRank(rank){
        this.playerRank = rank
    }
}



module.exports = Player