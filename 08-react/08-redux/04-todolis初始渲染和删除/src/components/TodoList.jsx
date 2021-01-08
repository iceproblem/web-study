import React, {Component} from 'react'
import Todo from "./Todo"

import store from "../store";

export default class List extends Component {
    constructor(props){
        super(props);
        this.state = store.getState();
    }
    componentDidMount() {
        // 订阅
        store.subscribe(()=>{
            // 更新状态机
            this.setState(store.getState())
        })
    }

    render() {
        let { todos } = this.state;
        return (
            <ul className="todo-main">
                {
                    todos.map((todo,index)=>{
                        return <Todo key={index} todo={todo} />
                    })
                }
            </ul>
        )
    }
}
