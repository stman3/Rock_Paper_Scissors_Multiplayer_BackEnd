const Room =require('./Room')

class Rooms{
    constructor(){
        this.rooms = []
    }


    joinRoom(RoomNumber,socketID,PlayerName,playerPoint){
        if(this.rooms.some(r=>r.getRoomNO()===RoomNumber)){
            const room = this.rooms.find(r=>r.getRoomNO()===RoomNumber)
            room.addPlayer(socketID,PlayerName,"player",playerPoint)
        }
        else{
            this.createRoom(socketID,RoomNumber,PlayerName,playerPoint)
        }
    }

    createRoom(socketID,RoomNumber,PlayerName,playerPoint){
        this.rooms.push(new Room(RoomNumber))
        const room = this.rooms.find(r=>r.getRoomNO()===RoomNumber)
        room.addPlayer(socketID,PlayerName,"admin",playerPoint)
    }

    getRoomsNumber(){
        return this.rooms.length
    }

    getRoom(RoomNumber){
        return this.rooms.find(r=>r.getRoomNO()===RoomNumber)
    }

    getRoomByID(socketID){
        console.log("find room")
        return this.rooms.find(r=>r.getPlayerByID(socketID).getsocketID()===socketID)
    }

   
}





module.exports = Rooms