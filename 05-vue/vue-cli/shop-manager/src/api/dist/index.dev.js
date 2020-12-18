"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ajax;

var _axios = _interopRequireDefault(require("axios"));

var _nprogress = _interopRequireDefault(require("nprogress"));

require("nprogress/nprogress.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 对axios进行二次封装
//引入axios模块
//引入NProgress js 和 css
//在ajax请求时，显示进度条
//进度条的css
_axios["default"].defaults.timeout = 10000; //配置ajax请求超时时间

_axios["default"].defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'; //配置ajax post请求头
//配置请求拦截器

_axios["default"].interceptors.request.use(function (config) {
  _nprogress["default"].start(); //开启进度条


  return config;
}, function (error) {
  return Promise.error(error);
}); // 配置响应拦截器


_axios["default"].interceptors.response.use(function (response) {
  _nprogress["default"].done(); // 关闭进度条
  // 过滤


  if (response.status === 200) {
    return Promise.resolve(response.data); // response.data是服务器响应的数据
  } else {
    return Promise.reject(response.data);
  }
}, function (error) {
  console.log(error);
});

function ajax() {
  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET';
  var promise;
  return new Promise(function (resolve, reject) {
    if (type.toUpperCase() === 'GET') {
      params['itliaoma'] = randomCode(20);
      promise = (0, _axios["default"])({
        url: url,
        params: params
      });
    } else if (type.toUpperCase() === 'POST') {
      promise = (0, _axios["default"])({
        method: 'post',
        url: url,
        data: params
      });
    }

    promise.then(function (response) {
      resolve(response);
    })["catch"](function (error) {
      reject(error);
    });
  });
}

function randomCode(length) {
  var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  var result = '';

  for (var i = 0; i < length; i++) {
    var index = Math.ceil(Math.random() * 9);
    result += chars[index];
  }

  return result;
}