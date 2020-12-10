// 在请求拦截器中添加前缀
$.ajaxPrefilter(function (option) {
    // 在每次ajax请求之前，在url前面拼接上http://localhost:3030
    option.url = "http://localhost:3030"+option.url;

    // 在请求拦截器中，带上一个token
    if(option.url.indexOf("/auth/") !== -1  || option.url.indexOf("/cauth/") !== -1){
        // 你的url中，有auth字段，需要带上token
        option.headers = {
            Authorization:localStorage.getItem("token") || ""
        }
    }

    // ajax调用完毕，可能成功了，也可能失败了，不管成功，还是失败，都要要走complelte这个api
    option.complete = function (res) {
        // console.log("ajax发出请求，不管成功还是失败，都要走complete")
        // console.log(res)
        if(res.responseJSON.msg == "invalid token" || res.responseJSON.msg == "No authorization token was found"){
            // 说明token被篡改
            // 1）删除token
            localStorage.removeItem("token")
            // 2）重定向到登录页
            location.href="./login.html"
        }
    }

})



















