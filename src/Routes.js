import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import Home from './Pages/Home/index'
import Login from './Pages/Auth/Login';

const Routes = (props) => {
    return (
        <Switch>
            <Route path='/' exact component={Home}></Route>
            <Route path='/login' component={Login}></Route>
        </Switch>
    );
}

export default Routes;