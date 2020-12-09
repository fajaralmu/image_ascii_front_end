
import React, { Component } from 'react';
import BaseComponent from './../BaseComponent';
export default class BaseMenus extends BaseComponent {

    constructor(props) {
        super(props, false);
        this.state = {
            shownMenuList: {}
        }

        this.shownMenuList = (id) => {
            const shownMenuList = this.state.shownMenuList;
            shownMenuList[id] = true;
            this.setState({ shownMenuList: shownMenuList });
        }
        this.hideMenuList = (id) => {
            const shownMenuList = this.state.shownMenuList;
            shownMenuList[id] = false;
            this.setState({ shownMenuList: shownMenuList });
        }
        this.isMenuListShown = (id) => {
            return this.state.shownMenuList[id] == true;
        }
        this.toggleMenuList = (e) => {
            const menuName = e.target.getAttribute("menu-name");
            if (this.isMenuListShown(menuName)) {
                this.hideMenuList(menuName);
            } else {
                this.shownMenuList(menuName);
            }
        }

    }
   
    extractChildren(menuChildren) {
        const children = [];
        for (let i = 0; i < menuChildren.length; i++) {
            const element = menuChildren[i];
            if (element.authenticated && this.isLoggedUserNull()) {
                continue;
            }
            if (this.isLoggedUserNull() == false && element.role != null && this.getLoggedUser().role != element.role) {
                continue;
            }
            children.push(element);
        }

        return children;
    }
    

}
