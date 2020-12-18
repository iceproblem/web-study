import Vue from "vue";
import Router from "vue-router";

import Home from "@/views/Home";
import About from "@/views/About";
import Mine from "@/views/Mine";

Vue.use(Router)

export default new Router({
    mode:"hash",
    routes:[
        {path:"/",redirect:"/home"},
        {
            path:"/home",
            name:"home",
            component: Home,
            children:[
                {path:"/home",redirect:"/home/news"},
                // 叫路由的懒加载（当路径匹配到了，才去加载组件）component:()=>import("../views/News")
                {path:"news",name:"news",component:()=>import("../views/News")},
                {path:"shop",name:"shop",component:()=>import("../views/Shop")},
            ],
        },
        {path:"/about",name:"about",component:About},
        {path:"/mine",name:"mine",component:Mine},
    ]
})