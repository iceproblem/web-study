import Vue from "vue";
import Router from "vue-router";

import Home from "../views/Home";
import Index from "../views/Index";
import About from "../views/About";
import Login from "../views/Login";
import Mine from "../views/Mine";

Vue.use(Router)
/*
路由的守卫（导航的守卫）：
    当每次刷新或进入某个路由时，进行权限验证。
分类：
    全局的路由守卫：
        全局的前置守卫  进入之前守卫
            语法：router.beforeEach()  注册一个全局的前置守卫
            beforeEach需要传递一个函数，此函数中有三个参数：
                to: 表示即将要进入的目标（路由）
                from:当前正要离开的目标（路由）
                next:是否放行
        全局的后置守卫
             了解
        路由的独享守卫
            此守卫是配置在路由规则中的。如下：

    组件内的守卫
        在一个组件内部也可以写守卫，就些守卫说白了，就是一些生命周期函数。
*/

let router = new Router({
    mode:"hash",
    routes:[
        {path:"/",redirect:"/home"},
        {path:"/home", name:"home", component:Home,
            children:[
                {path:"/home",redirect:"/home/index"},
                {path:"index",name:"index",component:Index},
                {path:"about",name:"about",component:About},
                {
                    path:"mine",
                    name:"mine",
                    component:Mine,
                    beforeEnter:(to,from,next)=>{
                        // 路由的独享守卫
                        // next也是表示是否放行
                        // 可以写业务判断是否要放行
                        console.log("进入了我的组件")
                        next()
                    }
                },
            ]
        },
        {path:"/login",name:"login",component:Login},
    ]
})

// 全局注册路由的前置守卫
router.beforeEach((to,from,next)=>{
    /*console.log("to",to)
    console.log("from",from)*/

    // 不是去/login
    if(to.path !== "/login"){
        if(window.isLogin && window.isLogin !== false){
            // 已经登录过了
            next(); // 登录过，放行
        }else{
            // 没有登录过 去登录
           return next(`/login?redirect=${to.path}`);
        }
    }

    // 放行
    next();
})

// 全局注册路由的后置守卫
// 里面没有next参数，不存在是否放行问题
// 了解就OK了
/*router.afterEach((to,from)=>{
    console.log("to:",to)
    console.log("from:",from)
});*/
export default router;







