let express = require("express");
let bodyParser = require("body-parser");
let path = require("path");
let app = express();
// 托管静态资源
app.use(express.static(path.resolve(__dirname,"./public")))
// 配置body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.get("/server2",(req,res)=>{
    res.send("server2 ok~")
})
app.get("/newsList",(req,res)=>{
    res.json([
        {id:1,title:"新闻标题1",content:"新闻内容1"},
        {id:2,title:"新闻标题2",content:"新闻内容2"},
        {id:3,title:"新闻标题3",content:"新闻内容3"},
        {id:4,title:"新闻标题4",content:"新闻内容4"},
    ]);
})
app.listen(4000,()=>{
    console.log("4000 ok~")
})




























