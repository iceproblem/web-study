let express = require("express");
let ejs = require("ejs");
let fs = require("fs");
let bodyParser = require("body-parser");
let path = require("path");
let app = express();

//配置bodyParser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//载入静态资源
app.use(express.static(path.resolve(__dirname,"public")));

//配置ejs
app.set("views","./views");
app.set("view engine","ejs");
// app.engine('html',ejs.renderFile);
app.get("/",(req, res) => {
    let arr =[];
    if(fs.existsSync("data.json")){
        arr = require("./data.json")
    }
    res.render("index.ejs",{msgs:arr})

})
app.get("/test",(req, res) => {
    res.send("hello express");
});

app.post("/publish",(req, res) => {
    // console.log(req.body);
    let msg = req.body;

    msg.time = new Date().toLocaleDateString();
    // console.log(msg);
    var arr =[];
    if(fs.existsSync("data.json")){
        arr = require("./data.json");
    }
    arr.unshift(msg);

    fs.writeFile("data.json",JSON.stringify(arr),"utf8",arr => {
        if(arr)
            console.log("arr");
        console.log("~发表成功~");
        res.send("<h>发表成功<a href='/'>返回首页面</a></h>")
    })
})
app.listen(3000,()=>{
    console.log("server is running on 3000");
})
