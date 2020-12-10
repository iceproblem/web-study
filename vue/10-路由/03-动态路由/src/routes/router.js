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
        {path:"/home",name:"home",component:Home},
        {path:"/about/:id",name:"about",component:About},
        {path:"/mine/:name/:age/:sex",name:"mine",component:Mine,mata:{address:"bj"}},
    ]
})