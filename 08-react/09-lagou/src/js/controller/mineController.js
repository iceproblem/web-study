import mineTpl from "../../views/mine/mine.html"

class mineController{
    render(){
        $("#main").html(mineTpl)
    }
}

export default new mineController()