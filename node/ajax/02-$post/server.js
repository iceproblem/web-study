let express = require("express");
let path = require("path");
let bodyParser = require("body-parser");
let app = express();

// 托管静态资源
app.use(express.static(path.resolve(__dirname,"./public")))
//配置bodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

let users = ["111","222","333","444","555"];
//get
app.get("/",(req, res) => {
    res.sendFile(path.resolve(__dirname,"./views/index.html"))
})
app.post("/check",(req, res) => {
    let username = req.body.username.trim();
    if(users.find(user=>user==username)){
        res.json({code:1,msg:" ❎"});
    }else{
        res.json({code:0,msg:" ✅"});
    }
})
//监听3000端口
app.listen(3000,()=>{
    console.log("server is running on 3000")
})