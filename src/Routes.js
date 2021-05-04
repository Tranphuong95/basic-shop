import React from 'react';
import {
    // BrowserRouter as Router,
    Switch,
    Route, useLocation
} from 'react-router-dom';
import Home from './Pages/Home/index'
import Login from './Pages/Auth/Login';
import SignUp from './Pages/Auth/SignUp';
import Page404 from './Pages/Page404/404';
import Stream from './Component/Stream';
import ProductmanageRouter from './Component/ProductManage';
import CheckoutCart from './Component/OrderProduct/CheckoutCart';
import CompleteOrder from './Component/OrderProduct/CompleteOrder';

const Routes = (props) => {
    const location = useLocation();
    return (
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/stream' component={Stream} />
            <Route path='/product-manage' component={ProductmanageRouter} />
            <Route path='/checkout-cart' component={CheckoutCart} />
            <Route path='/complete-order' component={CompleteOrder} />

            <Route path='/login' component={Login} />
            <Route path='/sign-up' component={SignUp} />

            <Route component={Page404} />
        </Switch>
    );
}

export default Routes;