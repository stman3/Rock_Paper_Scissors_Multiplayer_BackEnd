class Player{
    constructor(socketID,PlayerName,playerRank,playerPoint,playerState){
        this.socketID=socketID
        this.PlayerName=PlayerName
        this.playerRank=playerRank
        this.playerPoint=playerPoint
        this.playerState= playerState
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
    getPlayerRank(){
        return this.playerRank
    }
    getPlayerState(){
        return this.playerState
    }
    ChangePlayerState(){
        this.playerState=!this.playerState
    }
}



module.exports = Player