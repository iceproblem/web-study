import React, { Component } from 'react'
import Child from './Child'

export default class Parent extends Component {
    constructor(){
        super();
        console.log("Parent的constructor");
    }
    render() {
        console.log("Parent的render");
        return (
            <div>
                Parent
                <hr/>
                <Child></Child>
            </div>
        )
    }
    componentDidMount(){
        console.log("Parent的componentDidMount");
    }
}
