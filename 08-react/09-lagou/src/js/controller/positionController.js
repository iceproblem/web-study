import positionTpl from "../../views/position/position.html"
import itemTpl from "../../views/position/item.html"

import ajax from "../model/ajax"
class PositionController{
    constructor() {
        this.dataList = []; // 状态
        this.pageNo = 1; // 第几页
        this.pageSize = 15; // 每页显示多少条数据
        this.isMore = true; // 是否有更多数据
    }
    async getList(){
        let url = "/api/zhiwu"
        // ajax请求是异步的
        let result = await ajax(url);
        console.log(result);
        let html = template.render(itemTpl,{dataList:result.data});
        $(".position-list").html(html);
    }
    render(){
        $("#main").html(positionTpl)
        this.getList(); // 说明数据已经渲染到页面了

        let wrapper = document.getElementById("position-wrapper")
        // 原因是页面还没有渲染好（ajax请求数据是异步的）
        this.scroll = new BScroll(wrapper,{
            scrollY:true,
            pullDownRefresh: {
                threshold: 50,
                probeType: 3
            },
            pullUpLoad: true
        })

    }
}

export default new PositionController();