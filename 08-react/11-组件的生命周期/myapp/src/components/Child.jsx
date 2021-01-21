import React, { Component } from 'react'

export default class Child extends Component {
    constructor(){
        super();
        console.log("Child的constructor");
        this.state = {
            name:"wc"
        }
    }
    static getDerivedStateFromProps(props,state){
        console.log("Child的getDerivedStateFromProps",props,state);
        return {
            ...props,
            ...state
        }
    }
    render() {
        console.log("Chile的render");
        return (
            <div>
                child---{this.props.count}---{this.state.name}---{this.state.count}
            </div>
        )
    }
    componentDidMount(){
        console.log("Child的componentDidMount");
    }

    componentDidUpdate(){
        console.log("Child的componentDidUpdate");
    }

    componentWillUnmount(){
        console.log("Child的componentWillUnmount");
        clearInterval(this.timer)
    }
}
