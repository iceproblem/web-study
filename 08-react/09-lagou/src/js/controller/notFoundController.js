import notFoundTpl from "../../views/notFound/notFound.html"

class notFoundController{
    render(){
        $("#main").html(notFoundTpl)
    }
}

export default new notFoundController()