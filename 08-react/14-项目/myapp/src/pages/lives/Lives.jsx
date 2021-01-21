import React, { Component } from 'react'
import {Switch,Route} from "react-router-dom";

import LiveList from "./pages/LiveList";
import LiveAdd from "./pages/LiveAdd";
import NotFount from "../notFount/NotFount";

export default class Lives extends Component {
    render() {
        return (
            <Switch>
                <Route path="/live/add-live" component={LiveAdd}/>
                <Route path="/live" component={LiveList}/>
                <Route component={NotFount}/>
            </Switch>
        )
    }
}
