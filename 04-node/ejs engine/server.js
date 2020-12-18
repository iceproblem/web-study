let express = require("express");
let path = require("path");
//let ejs = require("ejs"); 没有调用let ejs 可以不写
let app = express();

//模板引擎位置
app.set("views","./views");
//使用ejs模板引擎
app.set("view engine","ejs");


//相应login
app.get("/login",(req, res) => {
    //res.render(path.resolve(__dirname,"./views/login.ejs"));

    res.render("login");

    //检查路径是否正确
    //console.log(path.resolve(__dirname,"./views/login.ejs"));
})

//响应list
app.get("/list",(req, res) => {
    let newList = [
        {id:1,data:"真新闻1"},
        {id:2,data:"真新闻2"},
        {id:3,data:"真新闻3"},
        {id:4,data:"真新闻4"},
        {id:5,data:"真新闻5"},
        {id:6,data:"真新闻6"},
        {id:7,data:"真新闻7"},
    ]

    res.render("list",{newList})
})

app.listen(3000,()=>{
    console.log("server is running on 3000");
})







