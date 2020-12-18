let express = require("express");
let path = require("path");
let app = express();

app.use(express.static(path.resolve(__dirname,"./public")))
//console.log(path.resolve(__dirname,"./public"))
app.listen(3000,()=>{
    console.log("server is running on 3000")
})


