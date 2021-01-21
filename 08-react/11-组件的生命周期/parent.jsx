import React, { Component } from 'react'
import child from './child';

export default class parent extends Component {
    constructor(){
        super();
        console.log("parent的constructor");
    }
    render() {
        console.log("parent的render");
        return (
            <div>
                我是parent组件
                <hr/>
                <child></child>
            </div>
        )
    }
}
