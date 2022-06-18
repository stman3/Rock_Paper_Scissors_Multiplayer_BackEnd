const express = require('express')
const app = express()
const http = require('http')
const {Server} = require('socket.io')
const Rooms =require('./Rooms')



const cors = require('cors')
const rooms = new Rooms()
let clientNo = 0
app.use(cors)
const server = http.createServer(app)


const io = new Server(server,{
    cors:{
        origin:"*"
    }
})


io.on('connection',(socket)=>{
    console.log(`User connected: ${socket.id}`)
    clientNo++

    socket.on("join_room",(data)=>{
        const checkRoomExsist=rooms.roomExsist(data.newPlayer.roomNo)
        if(checkRoomExsist){
           const checkRoomStae= rooms.getRoom(data.newPlayer.roomNo).RoomState
           if(checkRoomStae){
            socket.join(data.newPlayer.roomNo)
            rooms.joinRoom(data.newPlayer.roomNo,socket.id,data.newPlayer.PlayerName,data.newPlayer.playerPoint,data.newPlayer.playerState)
            const roomJ= rooms.getRoom(data.newPlayer.roomNo)
            const playerj = roomJ.Players.find(p=>p.socketID===socket.id)
            socket.emit("getplayer",playerj)
            io.in(data.newPlayer.roomNo).emit("PlayerRoom",roomJ)
           }else{
            socket.emit("getplayer",false)
           }
        }
        else{
            socket.join(data.newPlayer.roomNo)
            rooms.joinRoom(data.newPlayer.roomNo,socket.id,data.newPlayer.PlayerName,data.newPlayer.playerPoint,data.newPlayer.playerState)
            const roomJ= rooms.getRoom(data.newPlayer.roomNo)
            const playerj = roomJ.Players.find(p=>p.socketID===socket.id)
            socket.emit("getplayer",playerj)
            io.in(data.newPlayer.roomNo).emit("PlayerRoom",roomJ)
        }

    })

    socket.on('Send_State',(data)=>{
        const roomJ = rooms.getRoom(data.PlayerRoomNo)
        roomJ.Players.find(p=>p.socketID===socket.id).ChangePlayerState()
        io.in(data.PlayerRoomNo).emit('recive_State',roomJ)
    })

    

    socket.on('send_message',(data)=>{
        console.log(`Send_Message the messge is ${data.Message} to the room number ${data.PlayerRoomNo}`)
        io.in(data.PlayerRoomNo).emit("receive_message",data)
    })

    socket.on('send_StartRoom',(data)=>{
        io.in(data.PlayerRoomNo).emit("receive_start_Room",data)
    })


    socket.on('send_Player_Ch',(data)=>{
        console.log(`The Player Index is ${data.PlayerCh} to the room number ${data.PlayerRoomNo}`)
        io.in(data.PlayerRoomNo).emit("receive_Player_Ch",data.PlayerCh)
    })
    socket.on('send_Restart',(data)=>{
        io.in(data.PlayerRoomNo).emit("receive_Restart",data.PlayerCh)
    })



    socket.on("disconnect",()=>{
        console.log(`socket ${socket.id} disconnected`)
        clientNo--
        
        if(rooms.getRoomByID(socket.id)){
            const roomno = rooms.getRoomByID(socket.id)
            
            console.log(`the room number on disconnect is: ${roomno.getRoomNO()} and the numbmer of player ${roomno.getPlayerNo()}`)
            if(roomno.getPlayerNo()===1){
                rooms.deleteRoom(roomno.getRoomNO())
            }else{
                rooms.deleatePlayerByIDfromRoom(socket.id)
                io.in(roomno.getRoomNO()).emit("PlayerRoom",roomno)
         
            }
            //check if the this line is need it 
            socket.leave(roomno.getRoomNO())
        }
        
        socket.broadcast.emit("GetPlayerCount",clientNo)
    })

    io.emit("GetPlayerCount",clientNo)
    
    
})


const PORT = 3001   
server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})