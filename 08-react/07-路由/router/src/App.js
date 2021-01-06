import React, { Component } from 'react'

import Index from './components/Index'
import Movie from './components/Movie'
import Cinema from './components/Cinema'
import { Route,BrowserRouter as Router, Link } from 'react-router-dom';

export default class App extends Component {

    constructor(){
        super();
    }

    render() {
        return (
            <Router>
                <Link to="/index">首页</Link> &nbsp;&nbsp;
                <Link to="/movie">热映</Link> &nbsp;&nbsp;
                <Link to="/cinema">影院</Link> &nbsp;&nbsp;

                <div>
                    <Route path="/index" component={Index} ></Route>
                    <Route path="/movie" component={Movie} ></Route>
                    <Route path="/cinema" component={Cinema} ></Route>
                </div>
            </Router>
        )
    }

}
