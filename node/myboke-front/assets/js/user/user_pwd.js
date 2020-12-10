$(function(){
    let form = layui.form;
    //自定义校验规则
    form.verify({
        pwd:[/^[\S]{6,12}$/,"密码必须6到12位，且不能出现空格"],
        samePwd:function(value){
            if(value === $("[name=oldPwd]").val()){
                return "新密码不能和旧密码相同"
            }
        },
        rePwd:function(value){
            if(value !== $("[name=newPwd]").val()){
                return "两次输入的密码不一样"
            }
        }
    })

    //给表单注册submit事件
    $(".layui-form").submit(function(e){
        e.preventDefault();
        let newPwd = $("input[name='newPwd']").val();
        let oldPwd = $("input[name='oldPwd']").val();

        //发起ajax请求，完成修改密码功能
        $.post("/auth/updatepwd",{oldPwd,newPwd},res=>{
            if(res.status !== 0){
                return layui.layer.msg(res.msg)
            }
            layui.layer.msg(res.msg)

            $(".layui-form")[0].reset();
        })
    })
})