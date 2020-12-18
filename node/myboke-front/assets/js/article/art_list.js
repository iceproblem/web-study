$(function(){

    let q = {
        pagenum:1,
        pagesize:3,
    }

    //初始化文章列表
    initArticleList();
    function initArticleList(){
        $.get("/cauth/article/list",q,res=>{
            console.log(res)
            if(res.status !== 0){
                return layui.layer.msg("获取文章列表失败");
            }
            layui.layer.msg("获取文章列表成功");
            let htmlstr = template("tpl-table",{data:res.data});
            $("tbody").html(htmlstr);
            initCates();
            renderPage(res.all);
        })
    }

    //初始化分类数据
    function initCates(){
        $.get("/cauth/cates",res=>{
            // console.log(res)
            if(res.status !== 0){
                return layui.layer.msg("获取文章分类失败")
            }
            layui.layer.msg("获取文章分类成功")
            let htmlstr = template("tpl-cate",{data:res.data});
            $("[name=cate_id]").html(htmlstr)
            layui.form.render();
        })
    }
    // initCates();

    //美化时间的过滤器，过滤器的格式叫dataFormat
    template.defaults.imports.dataFormat = function (date) {
        const dt = new Date(date)
        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    // 定义补零的函数
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }

    //渲染分页
    var laypage = layui.laypage;
    function renderPage(total){
        laypage.render({
            elem: 'pageBox',
            count: total,
            limit:q.pagesize,
            curr:location.hash.replace('#!fenye=',''),
            hash:'fenye',
            layout:["count","limit","prev","page","next","skip"],
            limits:[2,3,5,10],
            jump:function(obj,first){
                q.pagenum =obj.curr;
                q.pagesize = obj.limit;
                if(!first){
                    initArticleList();
                }
            }
        });
    }

    //实现筛选
    $("#form-search").submit(function(e){
        e.preventDefault();
        let cate_id = $("select[name=cate_id]").val();
        let state = $("select[name=state]").val();
        q.cate_id = cate_id;
        q.state = state;
        initArticleList()
    })
})