let {src,dest,series} = require("gulp");
const gulpServer = require('gulp-webserver');

//这是一个任务，将复制html代码到dev
function copyHTML () {
    return src("./src/views/**/*.html").pipe(dest("./dev/"))
}

// 配置开发服务器
function startServer(){
    return src("./dev/")
        .pipe(gulpServer({
            port:8080,    // 配置端口
            host:'127.0.0.1',  // 配置主机
            open:true,  // 自动打开浏览器
            livereload:true, // 是否支持热更新
            directoryListing: false  // 是否显示项目目录结构
        }))
}

// 导出任务
exports.default = series(copyHTML,startServer)