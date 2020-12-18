let express = require("express");
let bodyParser = require("body-parser");
let app = express();

//给ejs模板引擎设置别名，html
app.engine("html",require("ejs").__express);

//使用html模板引擎
app.set("view engine","html");
//模板位置
app.set("views","./views");

//配置body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//路由
app.get("/",(req, res) => {
    res.render("reg");
})

//处理注册 使用post
app.post("/doreg",(req, res) => {
    //获取客户端（浏览器）传递的信息
    let username = req.body.username.trim();
    let pwd = req.body.pwd.trim();
    let repwd = req.body.repwd.trim();
    console.log(username,pwd,repwd);

    // 模拟从数据库中获取的用户信息
    let users = ["wangcai","xiaoqiang","admin"];
    if(users.find(user=>user===username)){
        res.send("<h1 style='color: red'>对不起，该用户名已经被注册了，请换个用户名~<a href='/'>返回注册页</a></h1>")
    }else{
        res.send("<h1 style='color: green'>恭喜你，该用户名可以使用~<a href='/'>返回注册页</a></h1>")
    }

});

//监听3000端口
app.listen(3000,()=>{
    console.log("server is running on 3000");
});


















