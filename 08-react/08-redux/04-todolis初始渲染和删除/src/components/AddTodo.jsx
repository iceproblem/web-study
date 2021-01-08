import React, {Component} from 'react'

export default class AddTodo extends Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="todo-header">
                <input
                    type="text"
                    placeholder="请输入今天的任务清单，按回车键确认"
                />
            </div>
        )
    }
}



