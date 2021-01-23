import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import LifeList from "./pages/LifeList";
import LifeAdd from "./pages/LifeAdd";
import NotFount from "../notFount/NotFount";

export default class Lifejob extends Component {
    render() {
        return (
            <Switch>
                <Route path={"/lifejob/add-life"} component={LifeAdd}/>
                <Route path={"/lifejob"} component={LifeList}/>
                <Route component={NotFount}/>
            </Switch>
        );
    }
}
