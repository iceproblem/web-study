let express = require("express");
let bodyParser = require("body-parser");
let app = express();

//给ejs模板引擎设置别名 html
app.engine("html",require("ejs").__express);
//使用html引擎模板
app.set("view engine","html");
app.set("views","./views");

//配置body-Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//get
app.get("/",(req, res) => {
    res.render("reg");
});

let users = ["111","222","333","444"]
app.get("/check",(req, res) => {
    let username = req.query.username;
    if(users.find(user=>user==username)){
        res.send(" ❗ 用户名已存在，请重试");
    }else{
        res.send(" <span style='color:green'>✔</span> 该用户名可用");
    }
});

//监听端口3000
app.listen(3000,()=> {
    console.log("server is running on 3000");
})