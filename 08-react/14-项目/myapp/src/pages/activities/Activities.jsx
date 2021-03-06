import React, { Component } from 'react'
import {Route, Switch} from "react-router-dom";
import ActivitiesList from "./pages/ActivitiesList";
import NotFount from "../notFount/NotFount";
import ActivitiesAdd from "./pages/ActivitiesAdd";
import ActivitiesEdit from "./pages/ActivitiesEdit";

export default class Activities extends Component {
    render() {
        return (
            <Switch>
                <Route path="/activities/add-activities" component={ActivitiesAdd} />
                <Route path={"/activities/edit-activities"} component={ActivitiesEdit}/>
                <Route path="/activities" component={ActivitiesList} />
                <Route component={NotFount} />
            </Switch>
        )
    }
}
