$(function (){
    getUserInfo();
    let layer = layui.layer;
    $("#btnLogout").click(function () {
        layer.confirm("确定要退出吗？",{icon:3,title:"提示"},function (index) {
            // 1）把本地token删除掉
            localStorage.removeItem("token");
            // 2）跳转到登录页面
            location.href = "./login.html"
            layer.close(index)
        });
    });
})

// 把获取用户信息的操作封装成一个函数
function getUserInfo(){
    // 发起ajax请求，获取用户的基本信息
    $.get("/auth/userinfo",function (res) {
        // console.log(res)
        if(res.status !== 0){
            layui.layer.msg("获取用户信息失败");
            return
        }
        // 渲染头像
        renderAvatar(res.data)
    })
}

function renderAvatar(user) {
    if (!user) return;
    // 先看一下此用户有没有nickname，有的话，使用nickname
    // 没有的话，使用username
    let name = user.nickname || user.username;
    $("#welcome").html(`欢迎：${name}`)
    // user_intro表示用户头像
    // console.log(user)
    if (user.user_intro !== null) { // 判断有没有用户头像
        // 此用户有头像
        $(".text-avatar").hide();
        $(".layui-nav-img").attr("src", user.user_intro).show();
    } else {
        // 隐藏用户头像的img
        $(".layui-nav-img").hide();
        // 此用户没有头像  使用name的首字母并大写
        $(".text-avatar").html(name[0].toUpperCase())
    }
}
