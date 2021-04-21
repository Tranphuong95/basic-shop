import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import Home from './Pages/Home/index'
import Login from './Pages/Auth/Login';
import SignUp from './Pages/Auth/SignUp';
import Page404 from './Pages/Page404/404';

const Routes = (props) => {
    return (
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/sign-up' component={SignUp} />
            <Route component={Page404} />
        </Switch>
    );
}

export default Routes;