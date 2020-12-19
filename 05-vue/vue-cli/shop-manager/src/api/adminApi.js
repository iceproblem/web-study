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

// 6)获取左侧的菜单
export const getLeftMenu = (pageNum, pageSize, parentId)=> ajax('/manager/api/auth/admin/left_menu', {pageNum, pageSize, parentId}, 'post');

// 7)添加角色
export const addRole = (queryList)=> ajax('/manager/api/auth/admin/add_role', queryList, 'post');

// 8)获取角色列表
export const getRoleList = (queryList)=> ajax('/manager/api/auth/admin/role_list', queryList, 'post');

// 9)根据id修改角色
export const editRole = (queryList)=> ajax('/manager/api/auth/admin/edit_role', queryList, 'post');

// 10)根据id删除角色
export const delRole = (queryList)=> ajax('/manager/api/auth/admin/del_role', queryList, 'post');

// 11)根据id删除角色
export const getLeftMenuAll = ()=> ajax('/manager/api/auth/admin/all_menu_list');

// 12)根据id获取角色的菜单
export const getRoleMenuWithId = (queryList)=> ajax('/manager/api/auth/admin/get_menu_with_role_id', queryList, 'post');

// 13)根据id修改角色的菜单
export const editRoleMenuWithId = (queryList)=> ajax('/manager/api/auth/admin/edit_menu_with_role_id', queryList, 'post');

// 14)获取管理员列表
export const getAdminList = (queryList)=> ajax('/manager/api/auth/admin/admin_list', queryList, 'post');

// 15)添加管理员
export const addAdmin = (queryList)=> ajax('/manager/api/auth/admin/add_admin', queryList, 'post');

// 16)更新管理员信息
export const updateAdmin = (queryList)=> ajax('/manager/api/auth/admin/update_admin', queryList, 'post');

// 17)删除管理员
export const deleteAdmin = (queryList)=> ajax('/manager/api/auth/admin/del_admin', queryList, 'post');

// 18)获取当前管理员拥有的角色
export const getRoleWithAdmin = (queryList)=> ajax('/manager/api/auth/admin/get_admin_role', queryList, 'post');

// 19)修改当前管理员拥有的角色
export const editRoleWithAdmin = (queryList)=> ajax('/manager/api/auth/admin/edit_admin_role', queryList, 'post');

// 20)根据角色获取左侧菜单
export const getLeftMenuByRole = (queryList)=> ajax('/manager/api/auth/admin/get_left_menu_with_role', queryList, 'post');


































