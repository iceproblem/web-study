import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import LifeList from "./pages/LifeList";
import LifeAddEdit from "./pages/LifeAddEdit";
import NotFount from "../notFount/NotFount";

export default class Lifejob extends Component {
    render() {
        return (
            <Switch>
                <Route path={"/lifejob/add-edit"} component={LifeAddEdit}/>
                <Route path={"/lifejob"} component={LifeList}/>
                <Route component={NotFount}/>
            </Switch>
        );
    }
}
