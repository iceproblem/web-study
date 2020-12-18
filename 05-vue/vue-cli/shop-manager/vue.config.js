module.exports = {
    lintOnSave:false, // 不进行代码的检验
    devServer:{
        proxy: {  // 表示代理
            '/manager': {    //将www.exaple.com印射为/apis
                target: 'http://localhost:5000/',  // 接口域名
                changeOrigin: true,  //是否跨域
                pathRewrite: {
                    '^/manager': ''   //需要rewrite的,
                }
            }
        }
    }
}