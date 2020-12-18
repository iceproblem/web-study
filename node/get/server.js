let express = require("express");
let path = require("path");
let app = express();

app.set("views","./views");
app.set("view engine","ejs");

app.get("/reg",(req, res) => {
    console.log("reg");
    res.render("reg");
})

app.get("/doreg",(req, res) => {
    console.log(req.query);
    res.send(`用户是：${req.query.username},密码：${req.query.pwd}`);
})

app.listen(3000,()=>{
    console.log("server is running on 3000");
})