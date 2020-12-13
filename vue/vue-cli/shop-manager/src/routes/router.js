import Vue from 'vue';
import Router from 'vue-router';

import layout from "@/views/layout/LayOut";
// import login from "../views/login/index"
Vue.use(Router);

let routes = [
    {path:"/login",name:"login",component:()=>import('@/views/login/index')},
    // {path:"/login",name:"login",component:login},
    {
        path:"/",
        name:"LayOut",
        component:layout,
        redirect:"/home",
        children:[
            {path:"home",name:"home",component:()=>import("@/views/home/index")}
        ],
    },
    {
        path:"/pm",
        component:layout,
        redirect:"/pm/product",
        children: [
            {path: "product",name:"product",component:()=>import("@/views/pm/product/index")},
            {path: "addProduct",name:"addProduct",component:()=>import("@/views/pm/product/add")},
            {path: "productCategory",name:"productCategory",component:()=>import("@/views/pm/productCategory/index")},
            {path: "productCateAdd",name:"productCateAdd",component:()=>import("@/views/pm/productCategory/add")},
            {path: "productCateUpdate",name:"productCateUpdate",component:()=>import("@/views/pm/productCategory/update")},
        ]
    },
    {
        path:"/om",
        component:layout,
        redirect:"/om/order",
        children: [
            {path: "order",name:"order",component:()=>import("@/views/om/index")},
            {path: "setting",name:"setting",component:()=>import("@/views/om/setting")},
        ]
    },
    {
        path:"/um",
        component:layout,
        redirect:"/um/admin",
        children: [
            {path: "admin",name:"admin",component:()=>import("@/views/um/admin/index")},
            {path: "role",name:"role",component:()=>import("@/views/um/role/index")},
            {path: "menu",name:"menu",component:()=>import("@/views/um/menu/index")},
        ]
    },
    {path:"*",name:"NotFound",component:()=>import("../NotFound")}
]
let router = new Router({
    mode:"hash",
    routes,
})

// 解决vue-router重复点击报错  push方法
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
// replace方法
const originalrePlace = Router.prototype.replace
Router.prototype.replace = function replace(location) {
    return originalrePlace.call(this, location).catch(err => err)
}

// 全局路由守卫
router.beforeEach((to,form,next)=>{
    if(to.path === "/login"){
       return  next();
    }
    let token = window.sessionStorage.getItem("token");
    if(!token){
        return  next("/login");
    }
    next();
})

export default router;
