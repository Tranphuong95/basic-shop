import React from 'react';
import { Route, NavLink } from 'react-router-dom';

function MenuLink({ label, to, activeOnlyWhenExact }) {
    return (
        <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => {
            const active = match ? 'menu-active' : '';
            return (
                <li className={`my-li ${active}`}>
                    <NavLink to={to} className="my-link">{label}</NavLink>
                </li>
            )
        }}>

        </Route>
    );
}

export default MenuLink;