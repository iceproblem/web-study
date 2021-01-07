import React, { Component } from 'react'
import store from "../store";

export default class Show extends Component {
    constructor(props) {
        super();
        this.state = {
            couner:store.getState().counter
        }
    }
    componentDidMount() {
        store.subscribe(()=>{
            this.setState({
                couner:store.getState().counter
            })
        })
    }

    render() {
        let {couner} = this.state;
        return (
            <div>
                <h1>计数器：{couner}</h1>
            </div>
        )
    }
}
