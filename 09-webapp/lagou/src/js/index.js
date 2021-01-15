import Router from "./router/router"

const MODE = "hash"
// const MODE = "history"

class App{
    constructor(){
        this.router =  new Router({
            mode:MODE
        })
        this.initEvent();
        this.initSwipper();
    }
    initEvent(){
        let that = this;
        $("#nav li").on("click",function(){
            $(this).addClass("active").siblings().removeClass("active");
            $(this).find("svg").find("path").attr("fill","#00b38a");
            $(this).siblings().find("svg").find("path").attr("fill","#333")

            // 点击跳转
            // let url  = $(this).attr("data-url");
            // that.router.go(url)

            let index = $(this).index()
            that.mySwiper.slideTo(index,400,false)

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
            this.slideToSwipper(url)
            this.setNavActive(url)
        })

        // 实现浏览器的前进和后退按钮
        if(MODE === "hash"){
            addEventListener("hashchange",()=>{
                let hash = location.hash.replace("#","");
                // that.router.go(hash)
                this.slideToSwipper(hash)
                this.setNavActive(hash)
            })
        }else{
            $(window).on("popstate",()=>{
                let url = history.state.path
                this.slideToSwipper(url)
                that.router.loadView(url)
                this.setNavActive(url)
            })
        }
    }

    // 根据url，切换到指定的swipper
    slideToSwipper(url){
        let index = $("#nav").find("li[data-url='"+url+"']").index()
        this.mySwiper.slideTo(index,400,false)
    }

    // 设置nav高亮
    setNavActive(url){
        $("#nav").find("li[data-url='"+url+"']").addClass("active").siblings().removeClass("active");
        $("#nav").find("li[data-url='"+url+"']").find("svg").find("path").attr("fill","#00b38a");
        $("#nav").find("li[data-url='"+url+"']").siblings().find("svg").find("path").attr("fill","#333")
    }

    // 初始化swiper
    initSwipper(){
        let that = this;
        this.mySwiper = new Swiper(".swiper-container",{
            on:{
                slideChange: function(){
                    //that.activeIndex 代表每一屏的索引
                    let cur = $("#nav").find("li").eq(this.activeIndex)
                    let url = cur.attr("data-url")
                    that.router.go(url)

                    that.setNavActive(url)
                },
              },
        })
    }
    
}
new App();































