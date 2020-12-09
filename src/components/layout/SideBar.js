import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import BaseComponent from './../BaseComponent';

import BaseMenus from './BaseMenus';
import { MENUS } from './../../constant/Menus';

class SideBar extends BaseMenus {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div  >
                <aside className="menu">
                    {MENUS.map((menu, i) => {
                        const childs = this.extractChildren(menu.children);
                        if (childs == null || childs.length == 0) { return null; }
                        const isMenuListShown = this.isMenuListShown(menu.name);
                        const iconClassName = isMenuListShown ? "fas fa-angle-up" : "fas fa-angle-down";

                        return (
                            <React.Fragment key={"menu_" + menu.name}>
                                <p key={menu.name} menu-name={menu.name} onClick={this.toggleMenuList} className="menu-label">
                                    <i style={{ marginRight: '10px' }} className={iconClassName} />
                                    {menu.name}
                                </p>
                                {isMenuListShown ?
                                    <ul className="menu-list">
                                        {childs.map((menuChild, j) => {
                                            return (<li key={"sidebar-menu-child-" + i + "-" + j}>
                                                <Link to={menuChild.link}>
                                                    <span className="icon">
                                                        <i className={menuChild.iconClassName ? menuChild.iconClassName : "fas fa-folder"} />
                                                    </span>
                                                    <span>
                                                        {menuChild.name}
                                                    </span>
                                                </Link>
                                            </li>)
                                        })}
                                    </ul>
                                    : null}
                            </React.Fragment>
                        )
                    })}
                </aside>
            </div>
        )
    }

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
    // performLogout: (app) => dispatch(actions.accountAction.performLogout(app)),
})

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(SideBar))

