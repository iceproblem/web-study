import React, {Component} from 'react'
import store from "../store";
import { addOneTodoAction} from "../store/actions/todos";

export default class AddTodo extends Component{
    constructor(props) {
        super(props);
        // 创建一个ref
        this.inputRef = React.createRef();
        this.state = store.getState();
    }
    // 当按下键盘的键
    _dealKeyDown(e){
        this.state = store.getState();
        let { todos } = this.state;
        let lastTodoId = todos.length === 0 ? 0 : todos[todos.length-1].id;

        if(e.keyCode === 13){
            let content = this.inputRef.current.value;
            if(!content.trim()){
                alert("请在输入框中输入内容");
                return;
            }
            let todo = {id:lastTodoId+1, content ,done:false};
            store.dispatch(addOneTodoAction(todo));
            this.inputRef.current.value = "";
        }
    }
    render() {
        return (
            <div className="todo-header">
                <input
                    type="text"
                    ref={ this.inputRef }
                    placeholder="请输入今天的任务清单，按回车键确认"
                    onKeyDown={ e=>this._dealKeyDown(e)}
                />
            </div>
        )
    }
}



