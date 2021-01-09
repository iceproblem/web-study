import React, {Component} from 'react'
import store from "../store";
import {delDoneTodoAction, isCheckedAllTodo} from "../store/actions/todos";

export default class Foot extends Component {
    constructor(props){
        super(props);
        this.state = store.getState();
    }
    componentDidMount() {
        store.subscribe(()=>{
            this.setState(store.getState())
        })
    }

    // 删除已完成的todo
    _delDoneTodo(){
        store.dispatch(delDoneTodoAction());
    }
    // 全选或反选
    _dealChecked(e){
        store.dispatch(isCheckedAllTodo(e.target.checked))
    }
    render() {
        let { todos,finishedCount,isChecked } = this.state
        return (
            <div className="todo-footer">
                <label>
                    <input
                        type="checkbox"
                        checked={ isChecked }
                        onChange = { e=>this._dealChecked(e)}
                    />
                </label>
                <span><span>已完成{ finishedCount }件</span> / 总计{ todos.length}件 </span>
                <button
                    className="btn btn-warning"
                    onClick={ ()=>this._delDoneTodo() }
                >清除已完成任务</button>
            </div>
        )
    }
}
