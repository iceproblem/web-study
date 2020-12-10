$(function(){
    //初始化富文本编辑器
    initEditor();
    initCates();

    //初始化图片剪裁
    let options = {
        aspectRatio:400/280,
        preview:".img-preview"
    }
    $("#image").cropper(options);

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

    //实现选择封面
    $("#btnChooseImage").click(function(){
        $("#coverFile").click();
    });
    $("#coverFile").change(function(e){
        let files = e.target.files;
        let newImgURL = URL.createObjectURL(files[0]);
        $("#image").cropper("destroy").attr("src",newImgURL).cropper(options);
    });

    //实现发布文章
    let art_state = "已发布";
    $("#form-pub").submit(function(e){
        e.preventDefault();

        console.log($(this).serialize())
        let fd = new FormData($(this)[0]);
        fd.append("state",art_state)
        $("#image").cropper("getCroppedCanvas",{
            width:400,
            height:280,
        }).toBlob(function (blob) {
            fd.append("cover_img",blob);
            $.ajax({
                url:"/cauth/article/add",
                method:"post",
                data:fd,
                contentType:false,
                processData:false,
                success:function (res) {
                    if(res.status !== 0){
                        return layui.layer.msg("发表文章失败")
                    }
                    layui.layer.msg("发表文章成功");
                    location.href="./art_list.html"
                }
            })
        })
    })
})