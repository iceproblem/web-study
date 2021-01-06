import React, { Component } from 'react'

import { Route,Link,Switch } from "react-router-dom"

export default class Movie extends Component {
    render() {
        return (
            <div>
                {/*嵌套路由*/}
                <Link to="/movie/hotshowing" >正在热映</Link> &nbsp;&nbsp;
                <Link to="/movie/commingsoon" >即将上映</Link>

                {/*Switch*/}
                <Switch>
                    <Route path="/movie/hotshowing">
                        <h1>正在热映</h1>
                    </Route>
                    <Route path="/movie/commingsoon">
                        <h1>即将上映</h1>
                    </Route>
                    <Route path="/movie/">
                        <h1>热映</h1>
                    </Route>
                </Switch>
            </div>
        )
    }
}
