import React, { Component } from 'react'

export default class ClosedStatus extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        const isClosed = this.props.closed == true;
        return (
            <div className="tags has-addons are-medium">
                <span className="tag is-dark">Status</span>
                <span className={"tag " + (isClosed ? "is-info" : "is-warning")}>{isClosed == true ? "Closed" : "Not Closed"}</span>
            </div>
        )
    }
}