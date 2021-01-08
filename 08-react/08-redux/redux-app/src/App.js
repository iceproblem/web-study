import React from 'react';
import "./index.css"

import AddTodo from './components/AddTodo'
import TodoList from './components/TodoList'
import Footer from './components/Footer'

class App extends React.Component {
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
