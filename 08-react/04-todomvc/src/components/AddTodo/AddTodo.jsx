import React, {Component} from 'react';

class AddTodo extends Component {
    render() {
        return (
            <header className="header">
                <h1>todos</h1>
                <input type="text" placeholder="what need to be done?" className="new-todo" />
            </header>
        );
    }
}

export default AddTodo;