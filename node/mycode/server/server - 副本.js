let express = require("express")
let ejs = require("ejs")
let fs = require("fs"); //filesystem 文件系统 操作文件
let bodyParser = require("body-parser")
let path = require("path")
let app = express();
// 配置bodyParser
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// 载入静态资源
app.use(express.static(path.resolve(__dirname,"public")))

// 配置ejs
app.set("views","./views"); // 告诉express，模板放在了views下面
app.set("view engine","ejs");

app.get("/",(req,res)=>{
    let arr = [];
    if(fs.existsSync("data.json")){
        arr = require("./data.json")
    }
    res.render("index.ejs",{ msgs:arr })
})
app.get("/test",(req,res)=>{
    res.send("hello express")
})
app.post("/publish",(req,res)=>{
    // console.log(req.body)
    let msg = req.body; // msg表示一条留言
    msg.time = new Date().toLocaleString();
    var arr = [];
    // fs.existsSync 判断一个文件是否存储
    if(fs.existsSync("data.json")){
        // [{}]
        arr = require("./data.json"); // [{},{}]
        console.log(arr)
    }
    arr.unshift(msg); //[{},{},{}]
    // console.log(msg)
    // writeFile覆盖式写方式 后面写的会把前面写的覆盖掉
    // appendFile追加式写文件  后面写的会追加上次内容的后面
    fs.writeFile("data.json",JSON.stringify(arr),"utf8",err=>{
        if(err) console.log(err); // 如果err存在，表示写入失败
        console.log("~发表留言成功了~")
        res.send("<h1>发表留言成功了<a href='/'>返回首页面</a></h1>")
    })
})
app.listen(3000,()=>{
    console.log("server is running on 3000~")
})













