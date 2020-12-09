
import React, { Component } from 'react';
class Alert extends Component {

    constructor(props) {
        super(props);

        this.onYes = (e) => {

            if (this.props.onYes) {
                this.props.onYes(e);
            }
        }
        this.onNo = (e) => {

            if (this.props.onNo) {
                this.props.onNo(e);
            }
        }
        this.onClose = (e) => {
            if (this.props.onClose) {
                this.props.onClose(e);
            }
        }
    }

    componentDidMount() {
        try {
            document.getElementById("button-alert-yes").focus();
        } catch (error) {
            
        }
    }

    render() {
        const title = this.props.title ? this.props.title : "Info";
        const yesOnly = this.props.yesOnly == true;
        const isError = this.props.isError == true;
        let headerClassName = 'modal-card-head has-background-link';
        if (isError) {
            headerClassName = 'modal-card-head has-background-danger';
        }
        return (
            <>
                <ModalBackdrop>
                    <form onSubmit={(e)=>e.preventDefault()}>
                    <div className='modal-card'>
                        <header className={headerClassName}>
                            <p className='modal-card-title has-text-white'>{title}</p>
                        </header>
                        <section  className= 'modal-card-body'>
                            {this.props.children}
                        </section>
                        <footer className='modal-card-foot'>
                            <div style={{margin:'auto'}}>
                                <button id="button-alert-yes" type="submit" 
                                onClick={this.onYes} className={this.props.yesOnly||this.props.isError?"button" : "button is-link"}>
                                    Yes
                                </button>
                                {this.props.yesOnly?null:<button onClick={this.onNo} className="button">No</button>}
                            </div>
                        </footer>
                    </div>
                    </form>

                </ModalBackdrop>
            </>
        )
    }
}

export const ModalBackdrop = (props) => {
    return (
        <div className="modal is-active has-text-centered" style={{ backgroundColor: 'rgba(100,100,100,0.7)' }} >
            <div className="modal-background"></div>
            {props.children}
        </div>
    );
}

export default Alert;