import positionCtrl from "../controller/positionController"
import searchCtrl from "../controller/searchController"
import mineCtrl from "../controller/mineController"
import notFount from "../controller/notFountController"

class Router{
    constructor(options){
        this.mode = options.mode
         // 配置路由表
        this.routes = {
            "position":positionCtrl,
            "search":searchCtrl,
            "mine":mineCtrl,
        }
    }
    // 加载视图
    loadView(path){
        if(this.routes[path]){
            this.routes[path].render();
        }else{
            // 404页面
            notFount.render();
        }
    }
    go(path){
        // console.log(path);
        if(this.mode === "hash"){
            location.hash = path;
        }else{
            history.pushState({path},"",path)
        }
        this.loadView(path)
    }
}

export default Router

























