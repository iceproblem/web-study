import React, {Component} from 'react';
import PropTypes from 'prop-types'

class Todo extends Component {
    static propTypes = {
        todo:PropTypes.object.isRequired,
        deleteTodo:PropTypes.func.isRequired
    }
    render() {
        let {todo,deleteTodo} = this.props;
        return (
            <li className={todo.complete ? "todo completed" : "todo"}>
                <div className="view">
                    <input
                        type="checkbox"
                        className="toggle"
                        defaultChecked={todo.complete}
                    />
                        <label>{todo.content}</label>
                        <button className="destroy" onClick={e=>deleteTodo(todo)}></button>
                </div>
                <input type="text" className="edit" style={{display: 'none'}}/>
            </li>
        );
    }
}

export default Todo;