import React from 'react';
import "./index.css"

import AddTodo from './components/AddTodo'
import TodoList from './components/TodoList'
import Footer from './components/Footer'

import store from "./store";
import {getAllTodoAction} from "./store/actions/todos";

class App extends React.Component {
    componentDidMount() {
        // 模拟ajax请求
        let todos = [
            { id:0, content:"学习redux", done:false },
            { id:1, content:"学习context", done:false }
        ]

        // 把数据存储在redux仓库中，todos-->payload
        store.dispatch(getAllTodoAction(todos))
    }
    render(){
        return (
            <div className="todo-container">
                <div className="todo-wrap">
                    <AddTodo />
                    <TodoList />
                    <Footer/>
                </div>
            </div>
        )
    }
}

export default App;
