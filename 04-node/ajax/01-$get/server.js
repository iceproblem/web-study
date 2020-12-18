let express = require("express");
let path = require("path");
let app = express();

let users = ["111","222","333","444","555"];

//托管静态模板
app.use(express.static(path.resolve(__dirname,"./public")));
//get
app.get("/",(req, res) => {
    res.sendFile(path.resolve(__dirname,"./views/index.html"))
})
app.get("/check",(req, res) => {
    let username = req.query.username.trim();
    if(users.find(user=>user==username)){
        res.json({code:1,msg:" ❎"});
    }else{
        res.json({code:0,msg:" ✅"});
    }
})

//监听3000端口
app.listen(3000,()=>{
    console.log("server is running on 3000");
})