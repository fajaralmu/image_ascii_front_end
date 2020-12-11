
import React, { Component } from 'react';
export default class Card extends Component {

    constructor(props) {
        super(props);

        this.saveButtonOnClick = (e) => {
            if (this.props.saveButtonOnClick) {
                this.props.saveButtonOnClick(e);
            }
        }
        this.editButtonOnClick = (e) => {
            if (this.props.editButtonOnClick) {
                this.props.editButtonOnClick(e);
            }
        }
        this.deleteButtonOnClick = (e) => {
            if (this.props.deleteButtonOnClick) {
                this.props.deleteButtonOnClick(e);
            }
        }
    }

    render() {
        const iconClassName = this.props.headerIconClassName;
        const iconOnClick = this.props.headerIconOnClick;

        return (
            <div className={"card "+this.props.className} style={{ margin: '10px', ...this.props.style }}>
                <header className="card-header">
                    <p className="card-header-title">
                        {this.props.title ? this.props.title : "Card Title"}
                    </p>
                    {null == iconClassName ? null : <HeaderIcon className={iconClassName} onClick={iconOnClick} /> }
                </header>
                <div className="card-content">
                    <div className="content">
                        {this.props.children}
                    </div>
                </div>
                {this.props.withButtonFooter ?
                    <footer className="card-footer">
                        <a href="#" onClick={this.saveButtonOnClick} className="card-footer-item">Save</a>
                        <a href="#" onClick={this.editButtonOnClick} className="card-footer-item">Edit</a>
                        <a href="#" onClick={this.deleteButtonOnClick} className="card-footer-item">Delete</a>
                    </footer>
                    : null
                }
                {this.props.footerContent ?
                    <footer className="card-footer">
                        {this.props.footerContent}
                    </footer>
                    :
                    null}
            </div>
        )
    }
}

const HeaderIcon = (props) => {
    return (
        <a className="card-header-icon" aria-label="more options" onClick={props.onClick}>
            <span className="icon">
                <i className={props.className} aria-hidden="true"></i>
            </span>
        </a>
    );
}