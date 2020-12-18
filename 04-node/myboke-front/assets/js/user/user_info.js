$(function () {
    initUserInfo(); // // 获取用户信息

    // 获取用户信息 目的：实现数据的回显
    let form = layui.form;
    let layer = layui.layer;
    function initUserInfo() {
        $.get("/auth/userinfo",function (res) {
            if(res.status !== 0){
                layui.layer.msg("获取用户信息失败");
                return
            }
            // console.log(res)
            form.val("formUserInfo",res.data)
        })
    }

    // 实现重置
    $("#btnReset").click(function (e) {
        e.preventDefault(); // 阻止默认事件   它也是默认事件
        initUserInfo(); // 获取之前的数据，实现数据回显。
    });
    // 实现修改
    $(".layui-form").submit(function (e) {
        e.preventDefault();
        let nickname = $("input[name=nickname]").val()
        let email = $("input[name=email]").val()
        $.post("/auth/userinfo",{nickname,email},function (res) {
            // console.log(res)
            if(res.status !== 0) return layer.msg("更新用户信息失败");
            layer.msg("更新用户信息成功");

            // 调用父页面（index.html）中的getUserInfo
            window.parent.getUserInfo();
        })
    })
})






