let {src,dest,series,watch} = require("gulp");
const concat = require("gulp-concat");
const sass = require("gulp-sass");
const gulpServer = require('gulp-webserver');
const webpackStream = require("webpack-stream");
const proxy = require("http-proxy-middleware")
const path = require("path")

//这是一个任务，将复制html代码到dev
function copyHTML () {
    return src("./src/views/**/*.html")
        .pipe(dest("./dev/"))
}
// 编译scss
function compileSCSS(){
    return src("./src/scss/**/*.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(concat("all.css"))
        .pipe(dest('./dev/'));
}
// 编译JS
function complieJS(){
    return src("./src/js/index.js")
        .pipe(webpackStream({
            mode:"development",
            entry:"./src/js/index.js",
            output:{
                path:path.resolve(__dirname,"./dev/"),
                filename:"all.js"
            },
            module:{
                rules:[
                    {
                        test:/\.js$/,
                        exclude: /node_modules/,
                        use:{
                            loader:"babel-loader",
                            options:{
                                presets:['@babel/preset-env'],
                                plugins: ['@babel/plugin-transform-runtime']
                            }
                        }
                    },
                    {
                        test:/\.html$/,
                        loader:"string-loader"
                    }
                ]
            }
        }))
        .pipe(dest("./dev/"))
}

// 配置开发服务器
function startServer(){
    return src("./dev/")
        .pipe(gulpServer({
            port:8080,    // 配置端口
            host:'127.0.0.1',  // 配置主机
            open:true,  // 自动打开浏览器
            livereload:true, // 是否支持热更新
            directoryListing: false,  // 是否显示项目目录结构
            middleware:[
                proxy('/api',{
                    // 代理的目标地址
                    target: 'http://localhost:3000/',
                    changeOrigin:true, // 是否支持跨域
                    pathRewrite:{
                        "^/api":""
                    }
                })
            ]
        }))
}
// 文件监控
function watchFile(){
    watch("./src/scss/**/*.scss",(cb)=>{
        compileSCSS();
        cb()
    })
    watch("./src/views/**/*.thml",(cb)=>{
        copyHTML();
        cb()
    })
    watch("./src/js/index.js",(cb)=>{
        complieJS();
        cb()
    })
}
// 把libs下的文件，copy到dev下面
function copyLibs(){
    return src("./src/libs/**/*.*")
        .pipe(dest("./dev/libs/"))
}
// 导出任务
exports.default = series(copyHTML,compileSCSS,complieJS,copyLibs,startServer,watchFile)