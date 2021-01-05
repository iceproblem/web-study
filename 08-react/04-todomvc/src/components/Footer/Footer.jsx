import React, {Component} from 'react';

class Footer extends Component {
    render() {
        return (
            <footer className="footer" >
                <span className="todo-count"><strong>1</strong> items left</span>
                <ul className="filters">
                    <li><a href="" className="selected">all</a></li>
                    <li><a href="" className="">active</a></li>
                    <li><a href="" className="">completed</a></li>
                </ul>
                <button className="clear-completed">clear completed</button>
            </footer>
        );
    }
}

export default Footer;