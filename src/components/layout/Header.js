
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'

import * as actions from '../../redux/actions/actionCreators'
import { connect } from 'react-redux'
import './SideBar.css'
import BaseMenus from './BaseMenus';
import { MENUS } from './../../constant/Menus';


class Header extends BaseMenus {
    constructor(props) {
        super(props, false);
        this.state = {
            ...this.state,
            showBurger: false
        }

        this.toggleNavBurger = () => {
            this.setState({ showBurger: !this.state.showBurger })
        }

        this.performLogout = () => {
            const props = this.props;
            this.showConfirmation("Apakah Anda ingin keluar?").then(function (accepted) {
                if (accepted) {
                    props.performLogout(props.app);
                }
            });
        }
    }
    render() {

        return (
            <nav className="navbar is-dark topNav">
                <div className="container">
                    <div className="navbar-brand">
                        <Link style={{ backgroundColor: '#fff' }} className="navbar-item" to="/">
                            <img src="NCv2.png" />
                        </Link>
                        <div onClick={this.toggleNavBurger} className="navbar-burger burger">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <div id="topNav" className={this.state.showBurger ? "is-active navbar-menu" : " navbar-menu"}>
                        <div className="navbar-start">
                            {MENUS.map((menu, i) => {
                                const childs = this.extractChildren(menu.children);
                                if (childs == null || childs.length == 0) { return null; }
                                const isMenuListShown = this.isMenuListShown(menu.name);
                                const iconClassName = isMenuListShown ? "fas fa-angle-up" : "fas fa-angle-down";

                                return (
                                    <React.Fragment key={"NavMenu_" + menu.name}>
                                        <p style={{ marginLeft: '10px' }} onClick={this.toggleMenuList} menu-name={menu.name} className="menu-label">
                                            <i style={{ marginRight: '10px' }} className={iconClassName} />
                                            {menu.name}  </p>
                                        {isMenuListShown ?
                                            <ul className="menu-list">
                                                {childs.map((linkProperty, j) => {
                                                    return <AppLink key={"header-link-" + j + "-" + i} loginStatus={this.props.loginStatus} loggedUser={this.props.loggedUser} linkProperty={linkProperty} />
                                                })}
                                            </ul> : null}
                                    </React.Fragment>)
                            })}
                        </div>
                        <div className="navbar-end">
                            <div className="navbar-item">
                                <div className="buttons has-addons">

                                    {this.props.loginStatus ?
                                        <><Link className="button is-info" to="/profile">
                                            <span className="icon">
                                                <i className="fas fa-user"></i>
                                            </span>
                                            <span>{this.props.loggedUser.display_name} - {this.props.loggedUser.role}</span>
                                        </Link>
                                            <a onClick={this.performLogout} className="button is-danger">
                                                <span className="icon">
                                                    <i className="fas fa-sign-out-alt"></i>
                                                </span>
                                                <span>Logout</span>
                                            </a>
                                        </> :
                                        <Link className="button is-info" to="/login">
                                            <span className="icon">
                                                <i className="fas fa-user"></i>
                                            </span>
                                            <span>Login</span>
                                        </Link>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

const AppLink = (props) => {
    const linkProperty = props.linkProperty;
    const loginStatus = props.loginStatus;
    const loggedUser = props.loggedUser
    const iconClassName = linkProperty.iconClassName ? linkProperty.iconClassName : 'fas fa-folder';
    if (null == linkProperty.link) {
        return null;
    }

    if (!loginStatus && linkProperty.authenticated) {
        return null;
    }
    if (linkProperty.role != null && loggedUser != null && loggedUser.role != linkProperty.role) {
        return null;
    }
    return (
        <Link key={linkProperty.name + "LINK"} className="navbar-item"
            to={linkProperty.link} >
            <span className="icon"><i className={iconClassName} /></span>
            <span>
                {linkProperty.name}
            </span>
        </Link>
    )
}


const mapStateToProps = state => {
    //console.log(state);
    return {
        //user
        loginStatus: state.userState.loginStatus,
        loggedUser: state.userState.loggedUser,
    }
}

const mapDispatchToProps = dispatch => ({
    performLogout: (app) => dispatch(actions.accountAction.performLogout(app)),
})

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Header))
