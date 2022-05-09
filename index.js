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
    socket.on('send_message',(data)=>{
        socket.broadcast.emit('receive_message',data)
    })

    socket.on("join_room",(data)=>{
        socket.join(data.newPlayer.roomNo)
        rooms.joinRoom(data.newPlayer.roomNo,socket.id,data.newPlayer.PlayerName,data.newPlayer.playerPoint)

        const roomJ= rooms.getRoom(data.newPlayer.roomNo)
        const playerj = roomJ.Players.find(p=>p.socketID===socket.id)
        console.log(roomJ.Players)
        setTimeout(() => {
           socket.emit("getplayer",playerj)
        }, 500);
        setTimeout(() => {
        io.in(data.newPlayer.roomNo).emit("PlayerRoom",roomJ)
    }, 500);
    })

    socket.on("disconnect",()=>{
        console.log(`socket ${socket.id} disconnected`)
        clientNo--
        if(rooms.getRoomByID(socket.id)){
            const roomno = rooms.getRoomByID(socket.id).getRoomNO()
            console.log(`the room number on disconnect is: ${roomno}`)
            rooms.deleatePlayerByIDfromRoom(socket.id)
            setTimeout(() => {
            io.in(roomno).emit("PlayerRoom",rooms.getRoom(roomno))
        }, 500);
        }
        socket.broadcast.emit("GetPlayerCount",clientNo)
    })

    io.emit("GetPlayerCount",clientNo)
    
    
})


const PORT = 3001   
server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})