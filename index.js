const express = require('express')
const app = express()
const http = require('http')
const {Server} = require('socket.io')

const cors = require('cors')
const players = makeArray(100,100)
let clientNo = 0
app.use(cors)
const server = http.createServer(app)


function makeArray(d1, d2) {
    var arr = [];
    for(let i = 0; i < d2; i++) {
        arr.push(new Array(d1));
    }
    return arr;
}

const io = new Server(server,{
    cors:{
        origin:"*"
    }
})


io.on('connection',(socket)=>{
    console.log(`User connected: ${socket.id}`)


    socket.on('send_message',(data)=>{
        socket.broadcast.emit('receive_message',data)
    })
    
    socket.on("join_room",(data,cb)=>{
        console.log(`user ${socket.id} is trying to join Room number ${data.playerRoom}`)
        socket.join(data.playerRoom)
        console.log(`room number is ${data.playerRoom}`)
        const player ={
            PlayerName:data.PlayerName,
            playerPoint:data.playerPoint,
            playerRank:data.playerRank,
            playerRoom:data.playerRoom
        }
        players[Number(data.playerRoom)][clientNo]=player
        cb(players[data.playerRoom])
        clientNo++
        console.log(`clientNo: ${clientNo}`)
        console.log(players[Number(data.playerRoom)][0].PlayerName)
    })
    socket.on('player',(data)=>{
        console.log(`playerName: ${data.PlayerName} playerRank: ${data.playerRank} playerPoint: ${data.playerPoint}`)
    })
})


const PORT = 3001   
server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})