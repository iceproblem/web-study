import React, {Component} from 'react'
import PropTypes from 'prop-types'
import store from "../store";
import {delOneTodoAction} from "../store/actions/todos";


export default class Todo extends Component{
    constructor(props){
        super(props);
        this.state = {
            isShowDelBtn:false
        }
    }
    static propTypes = {
        todo:PropTypes.object.isRequired
    }
    //是否显示删除按钮
    _isShowDelBtn(e,flag){
        this.setState({
            isShowDelBtn:flag
        })
    }
    // 删除一个todo
    _delOneTodo(todoId){
        store.dispatch(delOneTodoAction(todoId))
    }
    render() {
        let { todo } = this.props;
        let { isShowDelBtn } = this.state;
        return (
            <li onMouseOver={ e=>this._isShowDelBtn(e,true) } onMouseLeave={ e=>this._isShowDelBtn(e,false)}>
                <label>
                    <input
                        type="checkbox" defaultChecked={ todo.done } />
                    <span>{ todo.content }</span>
                </label>
                <button
                    style={{ display:isShowDelBtn ? "block" : "none"}}
                    className="btn btn-warning"
                    onClick={ ()=>this._delOneTodo(todo.id) }
                >
                    删除
                </button>
            </li>
        )
    }

}
