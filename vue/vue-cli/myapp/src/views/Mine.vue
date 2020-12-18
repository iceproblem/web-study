<template>
    <div id="mine">
        <h2>我的</h2>
    </div>
</template>

<script>
    export default {
        name: "Home",

        // 下面的三个钩子，叫组件内的守卫
        beforeRouteEnter(to,from,next){ // 路由进入之前调用，当前组件实例还没有创建
            // 当前组件对象还没有创建，我们是获取不到的组件对象的
            console.log("我的-进入之前调用",this); // this表示当前组件对象
            // next();
            next(vm=>{
                console.log(vm); // vm代表当前组件对象
            })
        },
        // 当路由参数有变化时，会调用
        beforeRouteUpdate(to,from,next){
            console.log("我的-路由参数有变化",this)
            next();
        },
        beforeRouteLeave(to,from,next){
            console.log("我的-离开时调用",this);
            next();
        }
    }
</script>

<style scoped>
    #mine{
        width: 100%;
        height: 100%;
        background-color: gold;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 30px;
        color: #ffffff;

    }
</style>
