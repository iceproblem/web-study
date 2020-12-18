let express = require("express");
let path = require("path");
let server = express();

server.get("/login",(req,res)=>{
    let filePath = path.resolve(__dirname,"01-login.html");
    res.sendFile(filePath);
})
server.listen(3000,()=>{
    console.log("server is running on 3000")
})