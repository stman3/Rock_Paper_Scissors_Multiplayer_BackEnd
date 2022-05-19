const Player =require('./Player')
class Room{
    constructor(roomNo,RoomState){
        this.roomNo=roomNo
        this.Players=[]
        this.RoomState=RoomState
    }
    
    getRoomNO(){
        return this.roomNo
    }

    addPlayer(socketID,PlayerName,playerRank,playerPoint,playerState){
        this.Players.push(new Player(socketID,PlayerName,playerRank,playerPoint,playerState))
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
            console.log(this.Players[0].getPlayerRank())
           this.Players =this.Players.filter(p=> p.getsocketID()!==SocketID)
           this.Players[0].setPlayerRank("admin")
        }
        else{
            this.Players= this.Players.filter(p=> p.getsocketID()!==SocketID)
            console.log(this.Players)
        }
    }
   

}





module.exports = Room