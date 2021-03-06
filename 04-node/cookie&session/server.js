let express = require("express");
let path = require("path");
let bodyParser = require("body-parser");
let cookieParser = require("cookie-parser");
let session = require("express-session")
let app = express();

//mongoDB
let MongoClient = require("mongodb").MongoClient;
let ObjectId = require("mongodb").ObjectId;
let url = "mongodb://localhost:27017/";
//模板引擎
app.set("views",path.resolve(__dirname,"./views")); //配置的是绝对路径
//如果更改模板为html文件，需要将模板引擎设置放在第二位 app.engine
app.engine("html",require("ejs").__express);
app.set("view engine","html");

//配置body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//托管静态资源
app.use(express.static(path.resolve(__dirname,"./public")));

//配置cookie
app.use(cookieParser());

//配置session
app.use(session({
    secret: 'wangcai',  // 加密
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge:60000*10 }  // 配置session_id的有效期是10分钟
}))


//渲染首页
app.get("/",(req, res) => {
    //种植cookie
    //res.cookie("username","wangcai",{maxAge:60000*60*24*365,httpOnly:true});

    //cookie记录上一次访问的时间
    /*let last = req.cookies.last;
    res.cookie("last",new Date().toLocaleString(),{maxAge:60000*60*24*365});
    if(last){
        res.send(`<h1>你上一次访问的时间是${last}</h1>`)
    }else{
        res.send("<h1>这是你第1次访问本网站</h1>");
    }*/

    // 存储数据，存储在session，session也是一片存储数据的区域
    // 你不需要种植cookie，它背后给你种植好
    req.session.name = "yangyang";
    // 根据session_id，获取session中存储的数据
    console.log(req.session.name) // 获取session中的存储的数据  不需要你处理sessin_id
    res.send("<h1> hello session</h1>");

    //res.render("index");
})
//获取图书列表
app.get("/list",(req, res) => {
    let page = req.query.page || 1;
    (page <= 0) && (page = 1);

    let pageSize = 3;//表示每页显示的数量
    let offset = (page-1)*pageSize;//翻页时需要跳过的条数
    //对数据库操作
    MongoClient.connect(url,{ useNewUrlParser:true }, function(err,db){
        if (err) throw err;
        var dbo = db.db("books");
        dbo.collection("booklist").find().skip(offset).limit(pageSize).toArray(function(err,result){
            if(err){
                res.json({
                    code:1,
                    data:"获取图书失败"
                })
            }
            //获取全部的图书数据
            dbo.collection("booklist").count().then(result2=>{
                let total = result2;
                let size = Math.ceil(total/pageSize);
                res.json({
                    code:0,
                    data:{
                        books:result, // 图书数据
                        total, // 图书总量
                        pageSize, // 第页显示多少条
                        page, // 当前是第几页面
                        size, // 一共有多少页
                    }
                })
            })
            console.log(result);
            db.close();
        })
    })
})

//添加图书
app.post("/add",(req, res) => {
    //接受客户端发送的数据
    console.log(req.body);

    //数据入库
    MongoClient.connect(url,{useNewUrlParser:true},function (err,db){
        if(err) throw err;
        var dbo = db.db("books");
        dbo.collection("booklist").insertOne(req.body,function(err,response){
            if(err){
                res.json({
                    code:1,
                    msg:"添加失败"
                })
            }
            res.json({
                code:0,
                msg:"添加成功"
            })
            db.close();
        })
    })
})

// 删除图片
app.get("/del",(req,res)=>{
    // console.log(req.query.id);
    let id = req.query.id; // 你得到的ID是一个字符串
    // 根据ID把数据库中的图书删除了
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("books");
        var whereStr = {_id:ObjectId(id)};  // 删除条件
        dbo.collection("booklist").deleteOne(whereStr, function(err, obj) {
            if (err){
                // 删除失败
                res.json({
                    code:1,
                    msg:"删除失败，查看你的网络情况"
                })
            }else{
                res.json({
                    code:0,
                    msg:"删除成功"
                })
            }
            db.close();
        });
    });
})
//监听3000端口
app.listen(3000,()=>{
    console.log("server is running on 3000")
})










