import React, {Component} from 'react'
import store from "../store";
import {delDoneTodoAction, isCheckedAllTodo} from "../store/actions/todos";

export default class Foot extends Component {
    constructor(props){
        super(props);
        this.state = store.getState();
    }
    // 删除已完成的todo
    _delDoneTodo(){
        this.state = store.getState();
        store.dispatch(delDoneTodoAction());
    }
    // 全选或反选
    _dealChecked(e){
        this.state = store.getState();
        store.dispatch(isCheckedAllTodo(e.target.checked))
    }
    render() {
        return (
            <div className="todo-footer">
                <label>
                    <input
                        type="checkbox"
                        onChange = { e=>this._dealChecked(e)}
                    />
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
