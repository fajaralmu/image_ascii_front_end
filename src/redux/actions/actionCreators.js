import * as types from '../types'
import * as url from '../../constant/Url'

const usedHost = url.contextPath();
const apiEntityBaseUrl = usedHost + "api/entity/"
const apiAccount = usedHost + "api/account/"
const apiAccountDashboard = usedHost + "api/accountdashboard/"
const apiAdmin = usedHost + "api/admin/"
const apiNotes = usedHost + "api/notes/"

 
export const accountAction = {

    requestAppId : (app) => {
        app.startLoading();
        return {
            type: types.REQUEST_ID,
            payload: {},
            meta: {
                app: app, type: types.REQUEST_ID,
                url: apiAccountDashboard.concat("user")
            }
        };
    },
    performLogout : (app) => {
        app.startLoading();
        let loginRequest = {
            type: types.DO_LOGOUT,
            payload: {},
            meta: { app: app, type: types.DO_LOGOUT, url: apiAccountDashboard.concat("logout") }
        };
        return loginRequest;
    },
    performLogin : (email, password, app) => {
        app.startLoading();
        let loginRequest = {
            type: types.DO_LOGIN,
            payload: {
                user: { email: email, password: password }
            },
            meta: { type: types.DO_LOGIN, url: apiAccount.concat("login"), app: app }
        };
        return loginRequest;
    }
}

export const applicationAction = {
    /**
     * @param {String} key
     * @param {*} data
     */
    storeApplicationData: (key, data) => {
        
        let requested = {
            type: types.STORE_APPLICTION_DATA,
            payload: {
                data:data,
                key:key   
            },
            meta: {
                type: types.STORE_APPLICTION_DATA,
            }
        };
        return requested;
    },
    removeApplicationData: (key) => {
        
        let requested = {
            type: types.STORE_APPLICTION_DATA,
            payload: {
                key:key   
            },
            meta: {
                type: types.REMOVE_APPLICTION_DATA,
            }
        };
        return requested;
    },

}
 

