import React, { Component } from 'react'

import store from "../store";
import {increment} from "../store/actions/counter";

export default class Add extends Component {
    render() {
        return (
                <button onClick={ e=>this._add(e)}>+ 1</button>
        )
    }
    _add(){
        store.dispatch(increment())
    }
}
