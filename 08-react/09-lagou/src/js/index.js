import Router from "./router/router"

const MODE = "hash"
// const MODE = "history"

class App{
    constructor(){
        this.router =  new Router({
            mode:MODE
        })

        this.initEvent();
    }
    initEvent(){
        let that = this;
        $("#nav li").on("click",function(){
            $(this).addClass("active").siblings().removeClass("active");
            $(this).find("svg").find("path").attr("fill","#00b38a");
            $(this).siblings().find("svg").find("path").attr("fill","#333")

            // 点击跳转
            let url  = $(this).attr("data-url");
            that.router.go(url)

        })
        // 首次加载页面
        window.addEventListener("load",()=>{
            let url = "";
            if(MODE === "hash"){
                url = location.hash.replace("#","") || "position"
            }
            if(MODE === "history"){
               url = history.state ? history.state.path : "position"
            //    console.log(url);
            }
            that.router.go(url)
            this.setNavActive(url)
        })

        // 实现浏览器的前进和后退按钮
        if(MODE === "hash"){
            addEventListener("hashchange",()=>{
                let hash = location.hash.replace("#","");
                that.router.go(hash)
                this.setNavActive(hash)
            })
        }else{
            $(window).on("popstate",()=>{
                let url = history.state.path
                that.router.loadView(url)
                this.setNavActive(url)
            })
        }
    }

    // 设置nav高亮
    setNavActive(url){
        $("#nav").find("li[data-url='"+url+"']").addClass("active").siblings().removeClass("active");
        $("#nav").find("li[data-url='"+url+"']").find("svg").find("path").attr("fill","#00b38a");
        $("#nav").find("li[data-url='"+url+"']").siblings().find("svg").find("path").attr("fill","#333")
    }
    
}
new App();































