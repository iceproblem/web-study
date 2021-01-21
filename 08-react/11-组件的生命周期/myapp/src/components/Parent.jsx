import React, { Component } from 'react'
import Child from './Child'

export default class Parent extends Component {
    constructor(){
        super();
        console.log("Parent的constructor");
        this.state = {
            count:0,
            isShowChild:true
        }
    }
    shouldComponentUpdate(){
        if(this.state.count >= 6){
            return false;
        }
        return true;
    }
    render() {
        console.log("Parent的render");
        return (
            <div id="app">
                Parent---{this.state.count}
                <hr/>
                {
                    this.state.isShowChild ? <Child count={this.state.count}></Child> : <div>div</div>
                }
                <button onClick={this._handleClick} >强制更新</button>
                <button onClick={ this._handleShow }>显示/隐藏子组件</button>
            </div>
        )
    }

    _handleClick = ()=>{
        this.state.count = 666;
        this.forceUpdate();
    }
    _handleShow = ()=>{
        this.setState({
            isShowChild:!this.state.isShowChild
        })
    }

    componentDidMount(){
        console.log("Parent的componentDidMount",document.getElementById("app").innerHTML);

        this.timer = setInterval(()=>{
            this.setState({
                count:++this.state.count
            })
        },3000)
    }

    componentDidUpdate(){
        console.log("Parent的componentDidUpdate",document.getElementById("app").innerHTML);
    }
    componentWillUnmount(){
        clearInterval(this.timer)
    }
}
