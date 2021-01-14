import positionTpl from "../../views/position/position.html"
import ItemTpl from "../../views/position/item.html"

import ajax from "../model/ajax"

class PositionController{
    constructor(){
        this.dataList = [];  // 状态
        this.pageNo = 1;  // 第几页
        this.pageSize = 15; // 每页显示多少条数据
        this.isMore = true; // 是否有更多的数据
    }

    // 获取列表数据
    async getList(){
        $("#loading").show();
        // let url = "http://localhost:3000/zhiwu"
        let url = `/api/zhiwu?pageNo=${this.pageNo}&pageSize=${this.pageSize}`
        // ajax请求是异步的
        let result = await ajax(url)
        // console.log(result);
        this.dataList = this.dataList.concat(result.data)
        if(this.dataList.length >= result.total){
            this.isMore = false;
        }
        let html = template.render(ItemTpl,{dataList:this.dataList})
        $(".position-list").html(html); 
        $("#loading").hide();
    }

    async render(){
        $("#main").html(positionTpl)
        // await下面的代码相当于是一个.then
        await this.getList();
    
        this.initScroll(); // 初始化better-scroller
    }

    initScroll(){
        if(this.scroll){
            this.scroll.destroy(); // 销毁 BetterScroll
        }
        // new BScroll时，需要保证内容必须是已渲染完成
        let wrapper = document.getElementById("position-wrapper")
        // 原因是页面还没有渲染好（ajax请求数据是异步的）
        // 如果上面加了await和async，就相当于数据已经渲染页面上了
        this.scroll = BetterScroll.createBScroll(wrapper,{
            scrollY:true,
            pullDownRefresh: {
                threshold: 50, // 下拉的阈值
                stop:0, // 当初始化一个新的BS时，停留在0这个位置
            },
            pullUpLoad: true
        })

        this.scroll.on("pullingDown", async ()=>{
            $(".more").show()
            $(".dixian").hide();
            this.isMore = true;
            
            this.dataList = [];  // 状态
            this.pageNo = 1;  // 第几页
            await this.getList();
            this.scroll.finishPullDown();  // 结束下拉
            this.scroll.refresh(); // 重新计算
            // this.initScroll();
        })

        this.scroll.on("scroll",(position)=>{
            if(position.y > 15){
                $(".refresh").show();
            }else{
                $(".refresh").hide();
            }
        })

        // 实现分页
        this.scroll.on("pullingUp",async ()=>{
            if(!this.isMore){
                $(".more").hide()
                $(".dixian").show();
                this.scroll.finishPullUp();  // 结束上拉
                this.scroll.refresh(); // 重新计算
                return;
            }
            this.pageNo++;
            await this.getList();
            this.scroll.finishPullUp();  // 结束上拉
            this.scroll.refresh(); // 重新计算
        })
    }
}

export default new PositionController();






