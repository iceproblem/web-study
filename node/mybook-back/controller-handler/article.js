let db = require("../dao/index")
let path = require("path")
const { count } = require("console")

//增加文章
exports.addArticle = (req,res)=>{
    //此处判断图片是否上传
    if(!req.file || req.file.fieldname !== "cover_img") return res.ss("文章的封面不能为空",2)

    //准备需要入库的数据
    const articleInfo = {
        ...req.body,
        cover_img:path.join('/uploads',req.file.filename),
        pub_date:new Date(),
        author_id:req.user.id
    }
    //准备sql语句
    let sql = 'insert into article set ?'
    db.query(sql,articleInfo,(err,result)=>{
        if(err) return res.ss(err)
        if(result.affectedRows !== 1) return res.ss("发布文章失败")
        res.ss("发布文章成功",0)
    })
}

//删除文章，本质就是修改表中is_delete属性(1表示已删除)
exports.deleteArticle = (req,res)=>{
    // res.ss("deleteArticle")
    let sql = 'update article set is_delete=? where id=?'
    db.query(sql,[1,req.query.id],(err,result)=>{
        if(err) return res.ss(err)
        if(result.affectedRows !== 1) return res.ss("删除文章失败")
        res.ss("删除文章成功",0)
    })
}

//获取文章列表
exports.getArticleList = (req,res)=>{
    // // res.ss("OK")
    // let pagenum = req.query.pagenum; //第几页
    // let pagesize = req.query.pagesize; //每页显示多少条
    // let cate_id = req.query.cate_id; //分类号
    // let state = req.query.state; //状态
    // let arr = [];
    // let obj = {};
    // let sumsql= 'select * from article where state=? and cate_id=?'
    // db.query(sumsql,[state,cate_id],(err,result)=>{
    //     if(err) return res.ss(err)
    //     let offset = (pagenum-1)*pagesize //从第几个开始遍历出
    //     let size = Math.ceil(result.length/pagesize) //数据库中查询到的数据总共可以占几页
    //     if(pagenum < size){
    //         for(let i=offset; i<(parseInt(offset)+parseInt(pagesize));i++){
    //             obj = {
    //                 id:result[i].id,
    //                 title:result[i].title,
    //                 pub_date:result[i].pub_date,
    //                 state:result[i].state,
    //                 cate_id:result[i].cate_id,
    //             }
    //             arr.push(obj)
    //         }
    //         return res.send({
    //             "status":0,
    //             "msg":"文章列表查询成功",
    //             "data":arr
    //         })
    //     }
    //     for(let i=offset;i<result.length;i++){
    //         obj = {
    //             id:result[i].id,
    //             title:result[i].title,
    //             pub_date:result[i].pub_date,
    //             state:result[i].state,
    //             cate_id:result[i].cate_id,
    //         }
    //         arr.push(obj)
    //     }
    //     return res.send({
    //         "status":0,
    //         "msg":"文章列表查询成功",
    //         "data":arr
    //     })
    // })

    let arrNum = []
    let arrStr = []
    let arrIdStr = []
    let sqlStr = 'select * from article where is_delete = 0'
    db.query(sqlStr, function (err, result) {
        if (err) return res.ss(err)
        for (let i in result) {
            arrNum.push(result[i].cate_id)
            arrStr.push(result[i].state)
        }
        let fun = function (sql0,req) {
            db.query(sql0, req.query.cate_id, function (err, result6) {
                if (err) return res.ss(err)
                for (let i in result6) {
                    arrIdStr.push(result6[i].state)
                }
                console.log(arrIdStr.includes(req.query.state))
                if (!req.query.cate_id && !req.query.state) {
                    let sql = 'SELECT * FROM article where is_delete = 0 limit ' + req.query.pagesize + ' offset ' + req.query.pagesize * (req.query.pagenum - 1);
                    list(sql, req, res)
                } else if (!req.query.cate_id && arrStr.includes(req.query.state)) {
                    let sql = 'SELECT * FROM article where is_delete = 0 and state=? limit ' + req.query.pagesize + ' offset ' + req.query.pagesize * (req.query.pagenum - 1);
                    list(sql, req, res, req.query.state)
                } else if (arrNum.includes(req.query.cate_id * 1) && !req.query.state) {
                    let sql = 'SELECT * FROM article where is_delete = 0 and cate_id=? limit ' + req.query.pagesize + ' offset ' + req.query.pagesize * (req.query.pagenum - 1);
                    list(sql, req, res, req.query.cate_id)
                } else if (arrNum.includes(req.query.cate_id * 1) && arrStr.includes(req.query.state) && arrIdStr.includes(req.query.state)) {
                    let sql = 'SELECT * FROM article where is_delete = 0 and cate_id=? and state=? limit ' + req.query.pagesize + ' offset ' + req.query.pagesize * (req.query.pagenum - 1);
                    list(sql, req, res, [req.query.cate_id, req.query.state])
                } else if (arrNum.includes(req.query.cate_id * 1) && !arrIdStr.includes(req.query.state)) {
                    return res.ss("没有数据")
                } else {
                    return res.ss("没有数据")
                }
            })
        }
        if (req.query.cate_id) {
            let sql0 = 'select * from article where is_delete = 0 and cate_id = ?'
            fun(sql0,req)
        } else {
            let sql0 = 'select * from article where is_delete = 0'
            fun(sql0,req)
        }
    })
	let list = function (sql, req, res, data) {
        db.query(sql, data, function (err, result) {
            function sss(result) {
                let num = 'select * from article where is_delete = 0'
                db.query(num, function (err, result2) {
                    if (err) return res.ss(err)
                    return res.send({
                        status: 0,
                        data: result,
                        all: result2.length
                    })
                })
            }
            if (err) return res.ss(err)
            for (let i in result) {
                let sqlStr = 'SELECT * FROM cats where id = ? and is_delete = 0'
                db.query(sqlStr, result[i].cate_id, (err, result1) => {
                    if (err) return res.ss(err)
                    result[i].cate_name = result1[0].name;
                    if (i == (result.length) - 1) {
                        sss(result)
                    }
                })
            }
        })
    }
}

//根据id获取文章详情
exports.getArticle = (req,res)=>{
    let sql = 'select * from article where id = ? '
    db.query(sql,req.query.id,(err,result)=>{
        if(err) return res.ss(err)
        // console.log(result);
        res.send({
            "status":0,
            "msg":"获取文章数据成功",
            "data":result[0]
        })
    })
}

//根据id修改文章详细信息
exports.updateArticle = (req,res)=>{
    //此处判断图片是否上传
    if(!req.file || req.file.fieldname !== "cover_img") return res.ss("文章的封面不能为空")
    //准备更新语句
    let sql = 'update article set title=?,content=?,cover_img=?,state=?,cate_id=? where id=?'
    //准备需要入库的数据
    const new_articleInfo = [req.body.title,req.body.content,path.join('/uploads',req.file.filename),req.body.state,req.body.cate_id,req.body.id]
    db.query(sql,new_articleInfo,(err,result)=>{
        if(err) return res.ss(err)
        if(result.affectedRows !== 1) return res.ss("修改文章失败")
        res.ss("修改文章成功",0)
    })
}

