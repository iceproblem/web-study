import React, {Component} from 'react'
import store from "../store";
import {delDoneTodoAction} from "../store/actions/todos";

export default class Foot extends Component {
    constructor(props){
        super(props);
        this.state = store.getState();
    }
    _delDoneTodo(){
        this.state = store.getState();
        store.dispatch(delDoneTodoAction());
    }
    render() {
        return (
            <div className="todo-footer">
                <label>
                    <input type="checkbox"/>
                </label>
                <span><span>已完成10件</span> / 总计20件 </span>
                <button
                    className="btn btn-warning"
                    onClick={ ()=>this._delDoneTodo() }
                >清除已完成任务</button>
            </div>
        )
    }
}
