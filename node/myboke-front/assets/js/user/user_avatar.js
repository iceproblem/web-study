$(function(){
    let options = {
        //宽高比
        aspectRatio:1,
        //指定预览区域
        preview:".img-preview"
    }
    $("#image").cropper(options)

    //优化上传按钮
    $("#btnChooseImage").click(function(){
        $("#file").click();
    })

    //选中一张图片
    $("#file").change(function(e){
        // console.log(e)
        // console.log("change...")

        // let filelist = e.target.files;
        // console.log(filelist.length);

        //target.files[0]代表选择的图片
        let file = e.target.files[0];
        let imgUrl = URL.createObjectURL(file)
        // console.log(imgUrl);
        // $("#image").attr("src",imgUrl)
        $("#image").cropper("destroy").attr("src",imgUrl).cropper(options);
    })

    //确定上传
    $("#btnUpload").click(function(){
        //得到裁剪后的区域
        let dataURL = $("#image").cropper("getCroppedCanvas",{
            //设置canvas大小
            widget: 100,
            height: 100
        }).toDataURL("image/png");

        //给服务器post请求
        $.post("/auth/updateAvatar",{avatar:dataURL},res=>{

        })
    })
})