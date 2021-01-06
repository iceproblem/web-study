import React, {Component} from 'react';
import PropTypes from 'prop-types'

class AddTodo extends Component {
    static propTypes = {
        addTodo:PropTypes.func.isRequired
    }
    _dealKeyup(e){
        let {addTodo} = this.props;

        let content = e.target.value.trim();

        if(!content) return;
        if(e.keyCode === 13){
            addTodo({content, complete:false})
            e.target.value = "";
        }
    }
    render() {
        return (
            <header className="header">
                <h1>todos</h1>
                <input
                    type="text"
                    placeholder="what need to be done?"
                    className="new-todo"
                    onKeyUp={e=>this._dealKeyup(e)}
                />
            </header>
        );
    }
}

export default AddTodo;