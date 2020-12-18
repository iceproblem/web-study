import ajax from "./index";

// 1)登录  在组件中调用checkLogin就实现登录
/*export const checkLogin = (username,password)=>{
    return ajax("/manager/api/auth/admin/login",{username,password},'post')
}*/
// 封装的目的：发起ajax请求，就像调用方法一样简单
export const checkLogin = (username,password) => ajax("/manager/api/auth/admin/login",{username,password},'post')


// 2)退出登录  在组件中调用checkLogoutp实现退出登录
export const checkLogout = () => ajax("/manager/api/auth/admin/logout");



// 3)获取商品统计数据
export const  getProductCount = ()=> ajax( '/manager/api/auth/admin/get_product_count');

// 4)获取管理员统计数据
export const  getAdminCount = ()=> ajax( '/manager/api/auth/admin/get_admin_count');

// 5)获取订单统计数据
export const  getOrderCount = ()=> ajax( '/manager/api/auth/admin/get_order_count');


































