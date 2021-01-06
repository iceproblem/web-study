import React, {Component} from 'react';
import AddTodo from "./components/AddTodo/AddTodo";
import TodoList from "./components/TodoList/TodoList";
import Footer from "./components/Footer/Footer";

class App extends Component {
    constructor() {
        super();
        this.state = {
            todos:[
                {content:"react",complete:"false"},
                {content:"vue.js",complete:"true"}
            ]
        }
    }
    // 添加todo
    _addTodo(todo){
        let {todos} = this.state;
        todos.push(todo);
        // 更新状态
        this.setState({
            todos
        })
    }

    // 删除todo
    _deleteTodo(todo){
        let { todos } = this.state;
        let index = todos.findIndex(t=>t==todo)
        todos.splice(index,1);
        // 更新状态
        this.setState({
            todos
        })
    }

    // 切换单个todo的状态
    _toggleTodo(todo){
        let { todos } = this.state;
        let index = todos.findIndex(t=>t==todo)
        todos[index].complete = !todos[index].complete
        // 更新状态机
        this.setState({
            todos
        })
    }
    render() {
        let { todos } = this.state;
        return (
            <section className="todoapp">
                <AddTodo addTodo={ (e)=>this._addTodo(e) }></AddTodo>
                <TodoList
                    todos={ todos }
                    deleteTodo={e=>this._deleteTodo(e)}
                ></TodoList>
                <Footer></Footer>
            </section>
        );
    }
}

export default App;