var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/blog";

MongoClient.connect(url,{useNewUrlParser:true},function (err,db){
    if(err) return err;

    console.log("没有插入集合，不能创建数据库！")
    db.close();
})