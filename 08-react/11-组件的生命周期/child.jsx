import React, { Component } from 'react'

export default class child extends Component {
    constructor(){
        super();
        console.log("Child的constructor");
    }
    render() {
        console.log("Child的render");
        return (
            <div>
                我是child组件
            </div>
        )
    }
    componentDidMount(){
        console.log("Child的componentDidMount");
    }
}
