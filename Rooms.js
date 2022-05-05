const Room =require('./Room')

class Rooms{
    constructor(){
        this.rooms = []
    }


    joinRoom(RoomNumber,PlayerName,playerRank,playerPoint){
        if(this.rooms.some(r=>r.getRoomNO()===RoomNumber)){
            const room = this.rooms.find(r=>r.getRoomNO()===RoomNumber)
            room.addPlayer(PlayerName,playerRank,playerPoint)
        }
        else{
            this.createRoom(RoomNumber,PlayerName,playerRank,playerPoint)
        }
    }

    createRoom(RoomNumber,PlayerName,playerRank,playerPoint){
        this.rooms.push(new Room(RoomNumber))
        const room = this.rooms.find(r=>r.getRoomNO()===RoomNumber)
        room.addPlayer(PlayerName,playerRank,playerPoint)
    }

    getRoomsNumber(){
        return this.rooms.length
    }

    getRoom(RoomNumber){
        return this.rooms.find(r=>r.getRoomNO()===RoomNumber)
    }
   
}





module.exports = Rooms