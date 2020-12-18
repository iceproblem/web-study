"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _LayOut = _interopRequireDefault(require("@/views/layout/LayOut"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// import login from "../views/login/index"
_vue["default"].use(_vueRouter["default"]);

var routes = [{
  path: "/login",
  name: "login",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/views/login/index'));
    });
  }
}, // {path:"/login",name:"login",component:login},
{
  path: "/",
  name: "LayOut",
  component: _LayOut["default"],
  redirect: "/home",
  children: [{
    path: "home",
    name: "home",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("@/views/home/index"));
      });
    }
  }]
}, {
  path: "/pm",
  component: _LayOut["default"],
  redirect: "/pm/product",
  children: [{
    path: "product",
    name: "product",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("@/views/pm/product/index"));
      });
    }
  }, {
    path: "addProduct",
    name: "addProduct",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("@/views/pm/product/add"));
      });
    }
  }, {
    path: "productCategory",
    name: "productCategory",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("@/views/pm/productCategory/index"));
      });
    }
  }, {
    path: "productCateAdd",
    name: "productCateAdd",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("@/views/pm/productCategory/add"));
      });
    }
  }, {
    path: "productAttr",
    name: "productAttr",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("@/views/pm/productAttr/index"));
      });
    }
  }, {
    path: "brand",
    name: "brand",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("@/views/pm/productBrand/index"));
      });
    }
  }]
}, {
  path: "/om",
  component: _LayOut["default"],
  redirect: "/om/order",
  children: [{
    path: "order",
    name: "order",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("@/views/om/index"));
      });
    }
  }, {
    path: "setting",
    name: "setting",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("@/views/om/setting"));
      });
    }
  }]
}, {
  path: "/um",
  component: _LayOut["default"],
  redirect: "/um/admin",
  children: [{
    path: "admin",
    name: "admin",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("@/views/um/admin/index"));
      });
    }
  }, {
    path: "role",
    name: "role",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("@/views/um/role/index"));
      });
    }
  }, {
    path: "menu",
    name: "menu",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("@/views/um/menu/index"));
      });
    }
  }]
}, {
  path: "*",
  name: "NotFound",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("../NotFound"));
    });
  }
}];
var router = new _vueRouter["default"]({
  mode: "hash",
  routes: routes
}); // 解决vue-router重复点击报错  push方法

var originalPush = _vueRouter["default"].prototype.push;

_vueRouter["default"].prototype.push = function push(location) {
  return originalPush.call(this, location)["catch"](function (err) {
    return err;
  });
}; // replace方法


var originalrePlace = _vueRouter["default"].prototype.replace;

_vueRouter["default"].prototype.replace = function replace(location) {
  return originalrePlace.call(this, location)["catch"](function (err) {
    return err;
  });
}; // 全局路由守卫


router.beforeEach(function (to, form, next) {
  if (to.path === "/login") {
    return next();
  }

  var token = window.sessionStorage.getItem("token");

  if (!token) {
    return next("/login");
  }

  next();
});
var _default = router;
exports["default"] = _default;