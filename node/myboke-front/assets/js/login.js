$(function(){
    $("#link_reg").click(function(){
        $(".reg-box").show();
        $(".login-box").hide();
    })

    $("#link_login").click(function(){
        $(".reg-box").hide();
        $(".login-box").show();
    })

    //注册密码校验
//获得form
    let form = layui.form;
//自定义校验规则
    form.verify({
        pwd:[/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
        repwd:function(value){
            if($(".reg-box [name=password]").val() !== value){
                return "两次输入的密码不一致"
            }
        }
    })

//注册
    let layer = layui.layer;
    $("#form_reg").submit(function(e){
        //阻止默认事件
        e.preventDefault();

        let data = {
            username:$(".reg-box [name=username]").val(),
            password:$(".reg-box [name=password]").val()
        }

        //发送post请求
        $.post("/api/register",data,function(res){
            //console.log(res)
            if(res.status !== 0){
                layer.msg(res.msg)
            }
            layer.msg(res.msg);
            $("#link_login").click();
        })
    });

//登录
    $("#form_login").submit(function(e){
        e.preventDefault();
        //console.log($(this).serialize());

        $.post("/api/login",$(this).serialize(),function(res){
            console.log(res)
            if(res.status !== 0) return layer.msg(res.msg);

            layer.msg(res.msg);
            localStorage.setItem("token",res.token);
            location.href="./index.html";
        })
    })
})



