import React, {Component} from 'react';
import PropTypes from 'prop-types'

class Todo extends Component {
    render() {
        let {todo} = this.props;
        return (
            <li className={todo.complete ? 'todo completed' : 'todo'}>
                <div className="view">
                    <input type="checkbox" className="toggle" defaultChecked={todo.complete}/>
                        <label>{todo.content}</label>
                        <button className="destroy"></button>
                </div>
                <input type="text" className="edit" style={{display: 'none'}}/>
            </li>
        );
    }
}

export default Todo;