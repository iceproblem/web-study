const { src, dest, series, watch,parallel } = require("gulp")
const sass = require("gulp-sass")
const concat = require('gulp-concat');
const gulpServer = require('gulp-webserver');
const webpackStream = require('webpack-stream');
const proxy = require('http-proxy-middleware');
const path = require("path")

// 这是一个任务
function copyHTML(){
    return src("./src/views/**/*.html").pipe(dest("./dev/"))
}

// 编译scss  需要把多个scss合并成一个css文件
function compileSCSS(){
    return src("./src/scss/**/*.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(concat("all.css"))
        .pipe(dest('./dev/'));
}

// 编译JS
function compileJS(){
    return src("./src/js/index.js")
        .pipe(webpackStream({
            // mode指定编译模式，有两种，development开发模式，production 生产模式
            // 开发模式下，JS代码会压缩， 生产模式JS代码不压缩
            mode:"development", 
            // mode:"production", 
            // 配置打包的入口
            entry:"./src/js/index.js", 
            // 配置打包的出口
            output:{
                // 输入的文件放在哪个目录下
                path:path.resolve(__dirname, "./dev/"),
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
                proxy("/api",{
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
    watch("./src/js/**/*.js",(cb)=>{
        compileJS();
        cb()
    })
    watch("./src/views/**/*.html",(cb)=>{
        copyHTML();
        compileJS();
        cb()
    })
}

// 把libs下面的的文件，copy到dev下面
function copyLibs(){
    return src("./src/libs/**/*.*").pipe(dest("./dev/libs/"))
}

function copyImages(){
    return src("./src/images/**/*.*").pipe(dest("./dev/images/"))
}

// 在这个配置文件中，可以有N个任务
exports.default = series( parallel(copyHTML,copyImages,copyLibs), compileSCSS,compileJS,startServer,watchFile)





