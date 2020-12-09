
import React, { Component } from 'react';
import BaseComponent from './../../BaseComponent';
import Section from './../../layout/Section';

export default class Characterizer extends BaseComponent {
    constructor(props) {
        super(props, false);
    }

    componentDidMount() {
        document.title = "Characterizer";
    }

    render() {

        return (
            <Section>    {this.title("Characterizer")}
            </Section>
        )
    }
}