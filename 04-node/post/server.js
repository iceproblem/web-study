let express = require("express");
let path = require("path");
let bodyParser = require("body-parser");
let app = express();

//配置ejs
app.set("views","./views");
app.set("view engine","ejs");

//配置body-Parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//get&&post
app.get("/tz",(req, res) => {
    res.render("tieba");
});
app.post("/dotz",(req, res) => {
    console.log(req.body);
    res.send(`帖子是:${req.body.content},作者是:${req.body.author}`);
});

//监听3000端口
app.listen(3000,()=>{
    console.log("server is running on 3000");
});
