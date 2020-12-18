$(function(){
    initCateList();
    function initCateList(){
        //发起get请求
        $.get("/cauth/cates",res=>{
            if(res.status !== 0){
                return layui.layer.msg("获取分类信息成功")
            }
            let htmlStr = template("tpl-table",{data:res.data})
            $("tbody").html(htmlStr)
        })
    }

    //添加分类
    let addindex = null;
    $("#btnAddCate").click(function (){
        addindex = layui.layer.open({
            type:1,
            title:"添加分类",
            area:["500px","240px"],
            content:$("#dialog-add").html()
        })
    })

    //通过事件委托，给确认按钮注册submit事件
    $("body").on("submit","#form-add",function(e){
        e.preventDefault();
        $.post("/cauth/addcats",$(this).serialize(),res=>{
            if(res.status !== 0){
                return layui.layer.msg("添加分类失败")
            }
            initCateList();
            layui.layer.msg("添加分类成功");
            layui.layer.close(addindex)
        })
    })

    //编辑分类
    //通过事件委托，给编辑按钮注册点击事件
    let editindex = null;
    $("body").on("click",".btn-edit",function(e){
        editindex = layui.layer.open({
            type:1,
            title:"编辑分类",
            area:["500px","240px"],
            content:$("#dialog-edit").html()
        })
        let id = $(this).attr("data-id");

        $.get("/cauth/getonecats",{id},res=>{
            if(res.status !== 0){
                return layui.layer.msg("获取当前分类失败");
            }
            layui.form.val("form-edit",res.data[0]);
        })
    })
    //实现编辑功能
    $("body").on("submit","#form-edit",function(e){
        e.preventDefault();

        $.post("/cauth/editcats",$(this).serialize(),res=>{
            if(res.status !== 0){
                return layui.layer.msg("编辑分类失败")
            }
            initCateList();
            layui.layer.msg("编辑分类成功");
            layui.layer.close(editindex);
            initCateList();
        })
    })

    //通过事件委托，实现删除分类
    $("body").on("click",".btn-delete",function(e){
        let id = $(this).attr("data-id");
        layui.layer.confirm("确定要删除吗?",{icon:3,title:"提示"},function(index){
            $.post("/cauth/deletecats",{id},res=>{
                if(res.status !== 0){
                    return layui.layer.msg("删除分类失败")
                }
                layui.layer.msg("删除分类成功");
                layui.layer.close(index);
                initCateList();
            })
        })
    })

})