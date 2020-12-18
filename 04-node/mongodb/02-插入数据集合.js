var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/blog";

MongoClient.connect(url,{useNewUrlParser:true},function (err,db){
    if(err) return err;
    console.log("数据库创建完毕");
    let dbase = db.db("blog");
    dbase.createCollection("users",function(err,res){
        if(err){
            console.log("集合创建失败");
            return;
        }
        console.log("集合创建成功！")
        db.closed();
    })
})