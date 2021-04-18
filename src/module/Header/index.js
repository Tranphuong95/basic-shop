import './index.scss';
import React from 'react';
import MenuLink from './../../setConfig/setNavLink';
const Header = (props) => {
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
    return (
        <div>
            <section className="header">
                <div className="nav-bar">
                    <div className="logo">SHOP GIÀY</div>
                    <div className="nav-menu" id="nav-menu">
                        <ul>
                            <MenuLink label="Trang chủ" to="/" activeOnlyWhenExact={true}></MenuLink>
                            <MenuLink label="Login" to="/login" activeOnlyWhenExact={false}></MenuLink>
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