import React, { Component } from 'react'

import store from "../store";
import {decrement} from "../store/actions/counter";

export default class Sub extends Component {
    render() {
        return (
            <button onClick={ e=>this._sub(e) }>- 1</button>
        )
    }
    _sub(){
        store.dispatch(decrement())
    }
}
