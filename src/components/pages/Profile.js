
import BaseComponent, { CommonTitle } from './../BaseComponent';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Card from './../container/Card';
import * as actions from '../../redux/actions/actionCreators'
import { InputField, LabelField, SubmitResetButton } from './../forms/commons';
import UserService from './../../services/UserService';
class Profile extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {

        };

        this.userService = UserService.instance;

        this.populateForm = () => {
            const form = document.getElementById("form-profile");
            const inputs = form.getElementsByClassName("input-form-field");
            const user = this.props.loggedUser;
            for (let i = 0; i < inputs.length; i++) {
                const element = inputs[i];
                if(element.name == "password"){
                    element.value = null;
                } else {
                    element.value = user[element.name];
                }
            }
        }

        this.onSubmit = (e) => {
            e.preventDefault();
            const form = e.target;
            const app = this;
            this.showConfirmation("Update Profile?")
            .then(function(accepted){
                if (accepted) {
                    app.updateProfile(form);
                }
            })
        }

        this.updateProfile = (form) => {
            const inputs = form.getElementsByClassName("input-form-field");
            const user = {};
            for (let i = 0; i < inputs.length; i++) {
                const element = inputs[i];
                if (null != element.value && "" != element.value) {
                    let fieldName = element.name;
                    user[fieldName] = element.value;
                }
            }

            this.commonAjax(
                this.userService.updateProfile, user,
                this.onSubmitSuccess, this.onSubmitError
            );
        }
        this.onSubmitSuccess = (response) => {
            this.showInfo("Update Profile Success");

            this.props.requestAppId(this.getParentApp());
        }
        this.onSubmitError = (e) => {
            this.showError("Update Profile Failed");
        }
    }

    componentDidMount() {
        this.validateLoginStatus();
        
        document.title = "Profile";
        this.populateForm();
    }

    componentDidUpdate() {
        this.validateLoginStatus();
    }

    render() {
        const user = this.props.loggedUser;
        if (null == user) {
            return <></>
        }
        return (
            <div>
                <CommonTitle>Profile</CommonTitle>
                <Card title={"Update Profile"} >
                    <form onSubmit={this.onSubmit} id="form-profile" >
                        <InputField label="Email" name="email" required={true} type="email" />
                        <InputField label="Username" name="name" required={true} />
                        <InputField label="Display Name" name="display_name" required={true} />
                        {/* <InputField label="Role" name="role" required={true} /> */}
                        <InputField label="Password" name="password" note="Kosongkan password apabila tidak ingin diubah" />
                        <LabelField label="Departement">
                            {user.departement? user.departement.name : ""}
                        </LabelField>
                        <SubmitResetButton submitText={
                            "Update"
                        } />
                    </form>
                </Card>
            </div>
        )
    }
}


const mapStateToProps = state => {

    return {
        loggedUser: state.userState.loggedUser,
        loginStatus: state.userState.loginStatus,
    }
}

const mapDispatchToProps = dispatch => ({
    requestAppId: (app) => dispatch(actions.accountAction.requestAppId(app)),
  })

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile));