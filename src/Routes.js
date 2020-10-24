import React from 'react';
import {
    Switch,
    Route,
} from "react-router-dom";
import Edit from './Pages/Edit'
import Main from './Pages/Main'

function Routes() {
    return (
        <Switch>
            <Route exact  path="/">
                <Main/>
            </Route>
            <Route path="/edit">
                <Edit/>
            </Route>
        </Switch>
    );
}

export default Routes;