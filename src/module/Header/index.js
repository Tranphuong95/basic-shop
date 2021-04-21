import './index.scss';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MenuLink from './../../setConfig/setNavLink';

import firebase from 'firebase';
const Header = (props) => {

    const [isSignedIn, setIsSignedIn] = useState(false);
    const onsShowMenu = () => {
        const navMenu = document.getElementById('nav-menu');
        const navIcon = document.getElementById('nav-icon');
        if (navMenu.className === 'nav-menu') {
            navMenu.classList.add('responsive');
        }
        else navMenu.className = 'nav-menu';

        if (navIcon.className === 'nav-icon') {
            navIcon.classList.add('change');
        }
        else navIcon.className = 'nav-icon';
    }
    const { onOpenModal } = props;

    useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
            setIsSignedIn(!!user);
        });
        return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    }, [isSignedIn]);
    console.log('isSignedIn', isSignedIn)
    return (
        <div>
            <section className="header">
                <div className="nav-bar">
                    <div className="logo"><Link to="/" style={{ color: 'white' }}>SHOP GIÀY</Link></div>
                    <div className="nav-menu" id="nav-menu">
                        <ul>
                            <MenuLink label="Trang chủ" to="/" activeOnlyWhenExact={true}></MenuLink>
                            {isSignedIn ? <MenuLink label={'Sign up'} to="/sign-up" activeOnlyWhenExact={false}></MenuLink> : <MenuLink label={'Login'} to="/login" activeOnlyWhenExact={false}></MenuLink>}
                            {/* <MenuLink label={isSignedIn ? 'Sign out' : 'Login'} to={isSignedIn ? '/sign-up' : '/login'} activeOnlyWhenExact={false}></MenuLink> */}
                        </ul>
                    </div>
                    <i className="fas fa-shopping-basket" onClick={onOpenModal}></i>
                    <div className="nav-icon" id="nav-icon" onClick={onsShowMenu}>
                        <div className="bar1"></div>
                        <div className="bar2"></div>
                        <div className="bar3"></div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Header;