let express = require("express");
let http = require("http");
let bodyParser = require("body-parser");
let path = require("path");
let app = express();
// 托管静态资源
app.use(express.static(path.resolve(__dirname,"./public")))
// 配置body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.get("/server1",(req,res)=>{
    res.send("server1 ok~")
})

// 在server1中响应一个页面
app.get("/",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"./views/index.html"))
})

app.get("/newsList",(req,res)=>{
    // http这个模块也可以发起get请求
    // http是一个原生的模块，代码量可以比较多
    http.get("http://localhost:4000/newsList",response=>{
        let data = "";
        response.on("data",chunk => {
            data += chunk;
        })
        response.on("end",()=>{
            console.log(data);
            res.json(data);
        })
    })

})
app.listen(3000,()=>{
    console.log("3000 ok~")
})




























