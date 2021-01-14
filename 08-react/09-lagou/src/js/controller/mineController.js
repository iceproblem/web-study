import mineTpl from "../../views/mine/mine.html"

class mineController{
    render(){
        $("#swiper-mine").html(mineTpl)
    }
}

export default new mineController()