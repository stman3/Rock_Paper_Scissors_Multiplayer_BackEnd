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
    })

    

    socket.on("disconnect",()=>{
        console.log(`socket ${socket.id} disconnected`)
        clientNo--
    })

    socket.emit("GetPlayerCount",clientNo)
    
    socket.emit("PlayerRoomNo",rooms.getRoomByID(socket.id))
})


const PORT = 3001   
server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})