import  React , {Component} from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'

export default class BaseComponent extends Component {
    constructor(props, authenticated = true){
        super(props);
        this.state = {
            updated:new Date()
        }
        this.parentApp = props.app;
        this.authenticated =  authenticated;
    
        this.validateLoginStatus = () => {
            if (!authenticated) {
                return true;
            }
            if (this.props.loginStatus != true || this.props.loggedUser == null) {
                this.backToLogin();
                return false;
            }
            return true;
        }
        this.getParentApp = () => {
            return this.props.app;
        }
        this.getLoggedUser = () => {
            return this.props.loggedUser;
        }
        this.isLoggedUserAdmin = () => {
            return this.isLoggedUserNull() == false && this.getLoggedUser().role == 'admin';
        }
        this.getLoggedUserDepartementName = () => {
            if (this.isLoggedUserNull()) return null;
            return this.getLoggedUser().departement.name;
        }
        this.isLoggedUserNull = () => {
            return false == this.props.loginStatus || null == this.props.loggedUser;
        }
        this.showConfirmation = (body) => {
            return new Promise((resolve, reject) =>{
                const onYes = function(e) {
                    resolve(true);
                }
                const onNo = function(e) {
                    resolve(false);
                }
                this.parentApp.showAlert("Confirmation", body, false, onYes, onNo);
            });
            
        }
        this.showConfirmationDanger = (body) => {
            return new Promise((resolve, reject) =>{
                const onYes = function(e) {
                    resolve(true);
                }
                const onNo = function(e) {
                    resolve(false);
                }
                this.parentApp.showAlertError("Confirmation", body, false, onYes, onNo);
            });
            
        }
        this.showInfo = (body) => {
            this.parentApp.showAlert("Info", body, true, function(){});
        }
        this.showError = (body) => {
            this.parentApp.showAlertError("Error", body, true, function(){});
        }

        this.backToLogin = () => {
            if (!authenticated) {
                return;
            }
            this.props.history.push("/login");
        }
        /**
         * 
         * @param {boolean} withProgress 
         */
        this.startLoading = (withProgress) => {
            this.parentApp.startLoading(withProgress);
        }

        this.endLoading = () => {
            this.parentApp.endLoading();
        }
        /**
         * 
         * @param {Function} method 
         * @param {any} params 
         * @param {boolean} withProgress 
         * @param {Function} successCallback 
         * @param {Function} errorCallback 
         */
        this.doAjax = (method, params, withProgress, successCallback, errorCallback) => {
            if(!method) {console.warn("Method Not Found! ");return}
            this.startLoading(withProgress);
            const app = this;

            method(params).then(function(response){
                if(successCallback){ 
                    successCallback(response);
                }
            }).catch(function(e){
                if(errorCallback){
                    errorCallback(e);
                } else {
                    if (typeof(e) == 'string'){
                        app.showInfo("Operation Failed: "+e);
                    }
                    app.showInfo("resource not found");
                }
            }).finally((e)=>{
                this.endLoading();
            })
        }

        /**
         * 
         * @param {Function} method 
         * @param {any} params 
         * @param {Function} successCallback 
         * @param {Function} errorCallback 
         */
        this.commonAjax = (method, params, successCallback, errorCallback) => {
            this.doAjax(method, params, false, successCallback, errorCallback);
        }
         /**
         * 
         * @param {Function} method 
         * @param {any} params 
         * @param {Function} successCallback 
         * @param {Function} errorCallback 
         */
        this.commonAjaxWithProgress = (method, params, successCallback, errorCallback) => {
            this.doAjax(method, params, true, successCallback, errorCallback);
        }

        this.title = (title) => {
            return <CommonTitle>{title}</CommonTitle>
        }
        this.refresh = () => {
            this.setState({updated:new Date()});
        }
    }

    componentDidUpdate() {
        if (this.authenticated && null == this.props.loggedUser) {
            this.backToLogin();
        }
    }
}

export const CommonTitle = (props) => {
    return <h2 style={{ textAlign: 'left', marginLeft:'10px' }}>{props.children}</h2>
}
