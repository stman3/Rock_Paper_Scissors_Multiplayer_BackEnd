const Room =require('./Room')

class Rooms{
    constructor(){
        this.rooms = []
    }


    joinRoom(RoomNumber,socketID,PlayerName,playerPoint,playerState){
        if(this.rooms.some(r=>r.getRoomNO()===RoomNumber)){
            const room = this.rooms.find(r=>r.getRoomNO()===RoomNumber)
            room.addPlayer(socketID,PlayerName,"player",playerPoint,playerState)
            room.ChangeState()
        }
        else{
            this.createRoom(socketID,RoomNumber,PlayerName,playerPoint,playerState)
        }
    }

    createRoom(socketID,RoomNumber,PlayerName,playerPoint,playerState){
        this.rooms.push(new Room(RoomNumber,true))
        const room = this.rooms.find(r=>r.getRoomNO()===RoomNumber)
        room.addPlayer(socketID,PlayerName,"admin",playerPoint,playerState)
    }

    getRoomsNumber(){
        return this.rooms.length
    }

    getRoom(RoomNumber){
        return this.rooms.find(r=>r.getRoomNO()===RoomNumber)
    }

    getRoomByID(socketID){
        return this.rooms.find(r=>r.getPlayerByID(socketID).getsocketID()===socketID)
    }

    deleatePlayerByIDfromRoom(socketID){
        const room =this.getRoomByID(socketID)
        room.deleatePlayerByID(socketID)
        //check if this line is needed
        if(room.getPlayerNo()===0){
            this.rooms.filter(r=>r.getRoomNO()!==room.getRoomNO())
        }
    }

    deleteRoom(RoomNumber){
        this.rooms = this.rooms.filter(r=>r.getRoomNO()!==RoomNumber)
    }

    roomExsist(RoomNumber){
        const roomExsist= this.rooms.some(r=>r.getRoomNO()===RoomNumber)
        return roomExsist
    }

 

   
}





module.exports = Rooms