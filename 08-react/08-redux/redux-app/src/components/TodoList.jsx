import React, {Component} from 'react'
import Todo from "./Todo"

export default class List extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <ul className="todo-main">
                <Todo />
            </ul>
        )
    }
}
