import Vue from "vue";
import Router from "vue-router";

import Home from "@/views/Home";
import About from "@/views/About";
import Index from "../views/Index";
import Mine from "@/views/Mine";
import Login from "../views/Login";


Vue.use(Router)

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