let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser")
let bodyParser = require("body-parser")
let session = require("express-session")
let app = express();
// 配置服务器可以获取cookie
app.use(cookieParser())
// 配置session
app.use(session({
    secret: 'wangcai',  // 加密
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge:60000*10 }  // 配置session_id的有效期是10分钟
}))
// 配置body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())
// 当访问/  响应一个index.html
app.get("/",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"./views/index.html"))
    //设置默认登陆状态

})
// 当访问/login  响应一个login.html
app.get("/login",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"./views/login.html"))
})
// 当访问/mine  响应一个mine.html
app.get("/mine",(req,res)=>{
    if(req.session.isLogin){
        res.sendFile(path.resolve(__dirname,"./views/mine.html"));
    }else{
        res.redirect("/login")
    }
})
// 处理登录逻辑
app.post("/doLogin",(req,res)=>{
    // 获取用户名和密码
    let username = req.body.username.trim();
    let pwd = req.body.pwd.trim();
    if(username == "admin" && pwd == "admin"){
        req.session.isLogin = true;
        res.redirect("/mine");
    }else{
        res.redirect("/login")
    }
})
// 退出登录
app.get("/logout",(req,res)=>{
    req.session.destroy(()=>{
        res.redirect("/")
    })
})
app.listen(3000,()=>{
    console.log("3000 ok~")
})

































