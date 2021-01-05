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
                {content:"vue.js",complete:"false"}
            ]
        }
    }
    render() {
        let { todos } = this.state;
        return (
            <section className="todoapp">
                <AddTodo></AddTodo>
                <TodoList todos={ todos } ></TodoList>
                <Footer></Footer>
            </section>
        );
    }
}

export default App;