import positionTpl from "../../views/position/position.html"

class PositionController{
    render(){
        $("#main").html(positionTpl)
    }
}

export default new PositionController();