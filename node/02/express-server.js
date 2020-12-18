let express = require("express");
let path = require("path");
let app = express();
app.get("/",(req, res) => {
    res.sendFile(path.join(__dirname,"/views/index.html"))
})
app.get("/list",(req, res) => {
    res.sendFile(path.join(__dirname,"./views/list.html"))
})
app.get("/list",(req, res) => {
    res.sendFile(path.join(__dirname,"./views/datail.html"))
})
app.get("/list",(req, res) => {
    res.sendFile(path.join(__dirname,"./views/my.html"))
})
app.listen(3030,()=>{
    console.log("server is running on 3030")
})