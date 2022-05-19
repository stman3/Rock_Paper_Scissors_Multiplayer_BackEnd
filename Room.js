const Player =require('./Player')
class Room{
    constructor(roomNo){
        this.roomNo=roomNo
        this.Players=[]
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
    getPlayerByID(socketID){
        return this.Players.find(p=>p.getsocketID()===socketID)
    }

    deleatePlayerByID(SocketID){
        const player = this.getPlayerByID(SocketID)
        if(player.playerRank==="admin"){
            console.log(this.Players[0])
           this.Players =this.Players.filter(p=> p.getsocketID()!==SocketID)
        }
        else{
            this.Players= this.Players.filter(p=> p.getsocketID()!==SocketID)
            console.log(this.Players)
        }
    }
   

}





module.exports = Room