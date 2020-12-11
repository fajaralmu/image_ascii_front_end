
import React, { Component, Fragment } from 'react';
import Card from '../container/Card';
import { LabelField } from '../forms/commons';
import { AnchorWithIcon } from '../buttons/buttons';
export default class About extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment>
                <Card title="About">
                    <LabelField label="Front_end">
                        <h2>ReactJs</h2>
                        <AnchorWithIcon attributes={{
                            target:"_blank",
                            href:"https://github.com/fajaralmu/image_ascii_front_end"
                        }} iconClassName="fas fa-file-code">Source Code</AnchorWithIcon>
                    </LabelField>
                    <LabelField label="Back_end">
                    <h2>Java</h2>
                        <AnchorWithIcon attributes={{
                            target:"_blank",
                            href:"https://github.com/fajaralmu/image_ascii_backend"
                        }} iconClassName="fas fa-file-code">Source Code</AnchorWithIcon>
                    </LabelField>
                </Card>
            </Fragment>
        )
    }
}