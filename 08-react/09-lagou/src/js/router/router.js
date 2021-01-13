import positionCtrl from "../controller/positionController"

class Router{
    go(path){
        positionCtrl.render()
    }
}

export default new Router()