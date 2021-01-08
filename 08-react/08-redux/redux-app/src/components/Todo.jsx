import React, {Component} from 'react'

export default class Todo extends Component{
    constructor(props){
        super(props);

    }
    render() {
        return (
            <li>
                <label>
                    <input
                        type="checkbox" />
                    <span>学习react so easy~</span>
                </label>
                <button
                    className="btn btn-warning">
                    删除
                </button>
            </li>
        )
    }

}
