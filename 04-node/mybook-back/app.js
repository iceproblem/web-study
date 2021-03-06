let express = require("express")
let cors = require('cors')
let path = require("path")
let bodyParser = require('body-parser')
//引入定义校验规则模块
let joi = require("@hapi/joi");
//引入express-jwt 对token进行解析
let expressJWT = require("express-jwt")
//引入密钥
let config = require("./schema/config")

let app = express();
//使用cors解决跨域
app.use(cors())

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:8080");//允许所有来源访问 
//     res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");//允许访问的方式 
//     res.header("X-Powered-By",' 3.2.1')
//     res.header("Content-Type", "application/json;charset=utf-8");
//     if(req.method=="OPTIONS") res. res.send(200);/*让options请求快速返回*/
//     else  next();
// });

//使用express-jwt对token解析
//expressJWT配置 第一个参数为密钥，unless后面跟的路由表示不需要进行验证的路由
app.use(expressJWT({secret:config.jwtSecretKey}).unless({path:[/^\/api/] }))


//配置托管静态资源
app.use(express.static(path.join(__dirname,'./uploads')))
//配置body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//定义一个方法 对res.send进行封装
app.use(function(req,res,next){
    res.ss = function(err,status=1){
        res.send({
            status,
            msg:err instanceof Error ? err.message : err
        })
    }
    next();
})

//引入二级登录路由
let userController = require("./controller/user")
app.use("/api",userController);
//引入二级用户信息模块
let userInfoController = require("./controller/userinfo")
app.use("/auth",userInfoController)
//引入二级分类列表
let catsController = require("./controller/cats")
app.use("/cauth",catsController)
//引入二级分类列表
let articleController = require("./controller/article")
app.use("/cauth/article",articleController)

//错误处理中间件
app.use('*',(err,req,res,next)=>{
    console.log(err);
    if(err.name = 'UnauthorizedError'){
        return res.send({
            status:0,
            msg:err.message
        })
    }
    if(err instanceof joi.ValidationError){
        return res.send({
            status:0,
            msg:err
        })
    }
    res.send({
        status:0,
        msg:"未知错误"
    })
})

app.listen(3030,function(){
    console.log("3030 run...");
})