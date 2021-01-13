import Router from "./router/router"
import positionCtrl from "./controller/positionController"
import positionTpl from "../views/position/position.html"

class App{
    constructor(){
        // 上来直接渲染模板
        positionCtrl.render()
        this.initEvent(positionTpl);
    }
    initEvent(){
        $("#nav li").on("click",function(){
            $(this).addClass("active").siblings().removeClass("active");
            $(this).find("svg").find("path").attr("fill","#00b38a");
            $(this).siblings().find("svg").find("path").attr("fill","#333")

            let url = $(this).attr("data-url")
            Router.go(url)
        })
    }
}

new App();































