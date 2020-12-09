import React, { Component } from 'react';
import { CommonTitle } from '../../BaseComponent';

export default class NotFound extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        document.title = "Not Found";
    }

    render() {

        return (
            <div>
                {/* <CommonTitle>404 Not Found</CommonTitle> */}
                <article class="message is-warning">
                    <div class="message-header">
                        <p>404 Not Found</p>
                        <button class="delete" aria-label="delete"></button>
                    </div>
                    <div class="message-body">
                        Halaman tidak ditemukan
  </div>
                </article>
            </div>
        )
    }
}