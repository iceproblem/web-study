import React, {Component} from "react"

class MyCom extends Component{
    constructor() {
        super();
        this.state = {
            isHot:false
        }
        this._clickHandle = this._clickHandle.bind(this)
    }
    render(){
        let { isHot } = this.state
        return(
            <div>
                <h1>今天天气很{isHot ? "炎热" : "寒冷"}</h1>
                {/* onClick 是react中的合成事件 */}
                {/* this._clickHandle()叫函数调用  这react事件绑定时，如果这样写，不能加() */}
                <button onClick={ this._clickHandle }>切换</button>
            </div>
        )
    }

    // _clickHandle=(e)=>{
    _clickHandle(){
        let { isHot } = this.state;
        this.setState({
            isHot :!isHot
        })
    }
}

export default MyCom;