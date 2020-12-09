
import React, { Component } from 'react';
export default class Section extends Component {

    render(){
        return (
            <section>
                {this.props.children}
            </section>
        )
    }
}