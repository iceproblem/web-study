import React, {Component} from 'react';
import PropTypes from "prop-types"
import Todo from "../Todo/Todo";

class TodoList extends Component {
    // static propTypes = {
    //     todos:PropTypes.array.isRequired
    // }
    render() {
        let {todos} = this.props;
        return (
            <section className="main">
                <input type="checkbox" className="toggle-all"/>
                <ul className="todo-list">
                    {
                        todos.map((todo,index)=>{
                            return <Todo key={index} todo={todo} ></Todo>
                        })
                    }
                </ul>
            </section>
        );
    }
}

export default TodoList;