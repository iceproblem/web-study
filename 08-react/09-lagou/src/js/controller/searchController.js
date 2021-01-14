import searchTpl from "../../views/search/search.html"

class searchController{
    render(){
        $("#main").html(searchTpl)
    }
}

export default new searchController()