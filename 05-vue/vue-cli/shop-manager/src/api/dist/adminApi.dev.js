"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOrderCount = exports.getAdminCount = exports.getProductCount = exports.checkLogout = exports.checkLogin = void 0;

var _index = _interopRequireDefault(require("./index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 1)登录  在组件中调用checkLogin就实现登录

/*export const checkLogin = (username,password)=>{
    return ajax("/manager/api/auth/admin/login",{username,password},'post')
}*/
// 封装的目的：发起ajax请求，就像调用方法一样简单
var checkLogin = function checkLogin(username, password) {
  return (0, _index["default"])("/manager/api/auth/admin/login", {
    username: username,
    password: password
  }, 'post');
}; // 2)退出登录  在组件中调用checkLogoutp实现退出登录


exports.checkLogin = checkLogin;

var checkLogout = function checkLogout() {
  return (0, _index["default"])("/manager/api/auth/admin/logout");
}; // 3)获取商品统计数据


exports.checkLogout = checkLogout;

var getProductCount = function getProductCount() {
  return (0, _index["default"])('/manager/api/auth/admin/get_product_count');
}; // 4)获取管理员统计数据


exports.getProductCount = getProductCount;

var getAdminCount = function getAdminCount() {
  return (0, _index["default"])('/manager/api/auth/admin/get_admin_count');
}; // 5)获取订单统计数据


exports.getAdminCount = getAdminCount;

var getOrderCount = function getOrderCount() {
  return (0, _index["default"])('/manager/api/auth/admin/get_order_count');
};

exports.getOrderCount = getOrderCount;