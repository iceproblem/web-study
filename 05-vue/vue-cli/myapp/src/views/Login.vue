<template>
    <div class="login">
        <button @click="dealLogin">登录</button>
    </div>
</template>

<script>
    export default {
        name: "Login",
        methods:{
            dealLogin(){
                window.isLogin = true; // 给GO上放一个isLogin的标识

                let redirect= this.$route.query.redirect

                if(redirect){
                    this.$router.push(redirect)
                }else{
                    this.$router.replace("/")
                }
            }
        }
    }
</script>

<style scoped>
    .login{
        width: 400px;
        height: 600px;
        margin: 0 auto;
        background-color: skyblue;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
