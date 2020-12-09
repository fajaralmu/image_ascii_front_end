import * as common from './Common'
import * as types from '../redux/types'
import * as url from '../constant/Url'
const axios = require('axios');

const POST_METHOD = "post";

export const performLoginMiddleware = store => next => action => {
    if (!action.meta || action.meta.type !== types.DO_LOGIN) {
        return next(action);
    }
    const app = action.meta.app;
    axios.post(action.meta.url, action.payload, {headers: common.commonAuthorizedHeader()
    })
        .then(response => {
            const responseJson = response.data;
            let loginKey = responseJson.user.api_token;
            let loginSuccess = true;
            let newAction = Object.assign({}, action, {
                payload: {
                    loginStatus: loginSuccess,
                    loginKey: loginKey,
                    loggedUser: responseJson.user
                }
            });
            delete newAction.meta;
            store.dispatch(newAction);
        })
        .catch(err => {
            let newAction = Object.assign({}, action, { payload: {loginStatus: false }});
            delete newAction.meta;
            store.dispatch(newAction);
        })
        .finally(param => {
            app.endLoading();  
        });

}

export const requestAppIdMiddleware = store => next => action => {
    if (!action.meta || action.meta.type !== types.REQUEST_ID) { return next(action); }

    let headers = common.commonAuthorizedHeader(); 

    // Axios.post
    axios.post(action.meta.url, action.payload, {
        headers: headers
    }).then(response  => {
            const responseJson = response.data;
            
            let loginKey = "";
            let requestId = responseJson.message;
            let loginStatus = false;
            if (responseJson.user) {
                loginKey = responseJson.user.api_token;
                loginStatus = true;
            }

            let newAction = Object.assign({}, action, { payload: {loginStatus: true, loginKey:loginKey, requestId:requestId, ...responseJson }});
            delete newAction.meta;
            store.dispatch(newAction);
        })
        .catch(err => {
            
             console.error("ERROR Get User, will get requestId"); 
             const endpoint = url.contextPath().concat("api/account/requestid")
            axios.get(endpoint).then(response=>{
                const responseJson = response.data;
                let requestId = responseJson.message;
            
                let newAction = Object.assign({}, action, { payload: {loginStatus: false, loginKey:null, requestId:requestId, ...responseJson }});
                delete newAction.meta;
                store.dispatch(newAction);
            }).catch((error)=>{
                alert("Error requesting application: "+error+". Try to reload the page");
            });
         })
        .finally(param => action.meta.app.endLoading());
}

export const performLogoutMiddleware = store => next => action => {
    if (!action.meta || action.meta.type !== types.DO_LOGOUT) {
        return next(action);
    }
    const app = action.meta.app;

    axios.post(action.meta.url, action.payload, {
        headers: common.commonAuthorizedHeader()
    })
        .then(response => {
            const responseJson = response.data;
            let logoutSuccess = false;
            if (responseJson.code == "00") {
                logoutSuccess = true;
            }else{
                alert("Logout Failed");
            }

            let newAction = Object.assign({}, action, {
                payload: {
                    loginStatus: !logoutSuccess
                }
            });
            delete newAction.meta;
            store.dispatch(newAction);
        })
        .catch(err => { console.log(err) })
        .finally(param => app.endLoading());

}