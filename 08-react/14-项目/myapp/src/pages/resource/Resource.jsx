import React, { Component } from 'react'
import { Switch,Route } from "react-router-dom";

import ResourceList from "./pages/ResourceList";
import ResourceAdd from "./pages/ResourceAdd";
import NotFount from "../notFount/NotFount";

export default class Resource extends Component {
    render() {
        return (
            <Switch>
                <Route path={"/resource/add-resource"} component={ResourceAdd} />
                <Route path={"/resource"} component={ResourceList} />
                <Route component={NotFount}/>
            </Switch>
        )
    }
}
