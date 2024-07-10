const { Socket } = require("dgram");
const express = require("express");
const HTTP = require("http");
const path = require("path");
const socketio = require("socket.io")
const app = express();
const PORT = 4000;

const server = HTTP.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");

io.on("connection",(socket)=>{
    socket.on("send-location",(data)=>{
        io.emit("receive-location", {id: socket.id, ...data});
    })
    socket.on("disconnect", ()=>{
        io.emit("user-disconnect", socket.id);
    })
    console.log("Connected Server");
})

app.get("/",(req, res)=>{
    res.render("index");
})

server.listen(PORT, ()=>{
    console.log("Server Stared on PORT: ",PORT);
})