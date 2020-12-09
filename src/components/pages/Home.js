
import BaseComponent from './../BaseComponent';
import  React from 'react';
import Section from './../layout/Section';
export default class Home extends BaseComponent {

    constructor(props) {
        super(props, false);
    }

    componentDidMount() {
        document.title = "Home";
    }

    render() {

        return (
            <Section>
                {this.title("Home")}
            </Section>
        )
    }
}