import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ProductManage from './ProductManage';
import ProductManageDelete from './ProductManageDelete';
import ProductManageDetail from './ProductManageDetail';
import ProductManagerUpdate from './ProductManagerUpdate';

const Routes = ({ match }) => {
    console.log(match.url)
    return (
        <Switch>
            <Route exact path={`${match.url}/new`} component={ProductManagerUpdate} />
            <Route exact path={`${match.url}/:id/update`} component={ProductManagerUpdate} />
            <Route exact path={match.url} component={ProductManage} />
            <Route exact path={`${match.url}/:id`} component={ProductManageDetail} />
            <Route path={`${match.url}/:id/delete`} component={ProductManageDelete} />
        </Switch>
    );
}

export default Routes;