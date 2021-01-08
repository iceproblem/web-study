import React, {Component} from 'react'

export default class Foot extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="todo-footer">
                <label>
                    <input type="checkbox"/>
                </label>
                <span><span>已完成10件</span> / 总计20件 </span>
                <button className="btn btn-warning">清除已完成任务</button>
            </div>
        )
    }
}
