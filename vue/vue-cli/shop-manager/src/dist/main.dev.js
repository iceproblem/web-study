"use strict";

var _vue = _interopRequireDefault(require("vue"));

require("normalize.css/normalize.css");

require("@/styles/fonts/iconfont.css");

require("@/styles/index.less");

var _vueQuillEditor = _interopRequireDefault(require("vue-quill-editor"));

require("quill/dist/quill.core.css");

require("quill/dist/quill.snow.css");

require("quill/dist/quill.bubble.css");

var _elementUi = _interopRequireDefault(require("element-ui"));

require("element-ui/lib/theme-chalk/index.css");

var _zhCN = _interopRequireDefault(require("element-ui/lib/locale/lang/zh-CN"));

var _App = _interopRequireDefault(require("./App.vue"));

var _router = _interopRequireDefault(require("./routes/router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 引入字体图标
// 引入全局的样式
// 引入富文本编辑器
// import styles
// for snow theme
// for bubble theme
_vue["default"].use(_vueQuillEditor["default"]
/* { default global options } */
);

_vue["default"].use(_elementUi["default"], {
  locale: _zhCN["default"]
});

_vue["default"].config.productionTip = false;
new _vue["default"]({
  router: _router["default"],
  render: function render(h) {
    return h(_App["default"]);
  }
}).$mount('#app');