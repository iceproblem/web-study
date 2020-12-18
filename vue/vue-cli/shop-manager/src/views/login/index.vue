<template>
    <div>
        <el-card class="box-card">
            <el-form
                ref="loginForm"
                :model="loginForm"
                :rules="loginFormRules"
            >
                <div style="text-align: center">
                    <i class="icon iconfont icon-apphoutaiguanli" style="font-size: 100px; color: #e9232c;"></i>
                </div>
                <h2 style="text-align: center;">后台管理系统</h2>
                <el-form-item prop="username">
                    <el-input
                            v-model="loginForm.username"
                            placeholder="请输入用户名"
                            prefix-icon="icon iconfont icon-icon"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                            v-model="loginForm.password"
                            placeholder="请输入密码"
                            type="password"
                    >
                        <span slot="prefix">
                            <i class="icon iconfont icon-mima"></i>
                        </span>
                        <span slot="suffix">
                            <i class="icon iconfont icon-icon-test1"></i>
                        </span>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="danger" style="width: 45%" @click="login">登录</el-button>
                    <el-button type="danger" style="width: 45%" @click="reset">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <img src="../../assets/images/login_center_bg.png" alt="" class="login-bg-img">
    </div>
</template>

<script>
    import md5 from "blueimp-md5"
    import config from "../../config/config";
    import {checkLogin} from "../../api/adminApi";
    export default {
        name: "index",
        data(){
            return{
                loginForm:{ // 登录表单的数据绑定的对象
                    username:"",
                    password:"",
                },
                loginFormRules:{
                    username:[
                        { required: true, message: '请输入登录的用户名', trigger: 'blur' },
                        { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
                    ],
                    password:[
                        { required: true, message: '请输入登录的密码', trigger: 'blur' },
                        { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
                    ]
                }
            }
        },
        methods:{
            login(){
                this.$refs.loginForm.validate(async (valid) => {
                    if (valid) {
                        // 表示验证通过  发ajax请求就是调用方法
                        let result = await checkLogin(this.loginForm.username,md5(this.loginForm.password, config.KEY))
                        // console.log(result)
                        if(result.status !== 1) return this.$message.error(result.msg);
                        // 登录成功
                        this.$message.success(result.msg)
                        // 把token保存到sessionStorage中
                        window.sessionStorage.setItem("token",result.data.token)
                        // 路由跳转
                        this.$router.push("/home")
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            reset(){
                this.$refs.loginForm.resetFields()
            }
        },
    }
</script>

<style scoped lang="less">
    .box-card{
        width: 360px;
        position: absolute;
        left: 50%;
        right: 50%;
        margin-left: -180px;
        border-top: 10px solid #e9232c;
        margin-top: 120px;
    }
    .login-bg-img{
        background: #e9232c;
        margin-top: 205px;
        width: auto;
        height: auto;
        max-height: 100%;
        max-width: 100%;

    }
</style>
