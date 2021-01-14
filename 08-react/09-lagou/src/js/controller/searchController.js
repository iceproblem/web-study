import searchTpl from "../../views/search/search.html"

class searchController{
    render(){
        $("#swiper-search").html(searchTpl)
    }
}

export default new searchController()