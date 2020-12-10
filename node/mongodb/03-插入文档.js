var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/blog";

MongoClient.connect(url,{useNewUrlParser:true},function (err,db){
    if(err) return err;
    let dbase = db.db("blog");
    dbase.collection("users").insertOne({username:"wc",pwd:"123"},function (err,res) {
        if(err){ console.log("插入文档失败");  return; }
        console.log("文档插入成功")
        db.close();
    });
})