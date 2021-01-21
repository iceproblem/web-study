import React, { Component } from 'react'

export default class Child extends Component {
    constructor(){
        super();
        console.log("Child的constructor");
    }
    render() {
        console.log("Chile的render");
        return (
            <div>
                child
            </div>
        )
    }
    componentDidMount(){
        console.log("Child的componentDidMount");
    }
}
