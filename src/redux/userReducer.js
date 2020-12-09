import * as types from './types' 
import * as menuData from '../constant/Menus'
import { setCookie } from '../middlewares/Common';
import { setApiToken } from './../middlewares/Common';
import { uniqueId } from './../utils/StringUtil';

export const initState = {
    loginKey: null,
    loginStatus: false,
    loginFailed: false, 
    loggedUser: null,
    loginAttempt: false,
    requestId: uniqueId()+new Date().getTime(),
    lastLoginAttempt:new Date(),
    applicationProfile: {},
};

export const reducer = (state = initState, action) => {
    let result = {};
    /*
        ========setting menu========
    */
    switch (action.type) {
        case types.REQUEST_ID:
           result = { ...state, 
                requestId: action.payload.requestId, 
                applicationProfile: action.payload.applicationProfile };
            
            if (action.payload.loginStatus != true) {

                result.loginStatus = false;
                result.loggedUser = null;
            } else {

                if (action.payload.user) {

                    result.loggedUser = action.payload.user;
                    result.loginStatus = true;
                    setApiToken(result.loggedUser.api_token);
                }else {
                    result.loginStatus = false;
                    result.loggedUser = null;
                }
            }

            return result;
        case types.DO_LOGIN:
            console.debug("DO_LOGIN");
            if (!action.payload.loginStatus) {
                return { ...state, lastLoginAttempt:new Date(), loginFailed: true }
            }

            console.debug("DO_LOGIN true ", new Date());
            console.debug("APITOKEN: ", action.payload.loginKey);
            setApiToken(action.payload.loginKey);
            result = {
                ...state,
                lastLoginAttempt:new Date(),
                loginAttempt: true,
                loginStatus: true, //action.payload.loginStatus,
                loginKey: action.payload.loginKey,
                loginFailed: false, 
                loggedUser: action.payload.loggedUser
            };
           
            
            return result;
        case types.DO_LOGOUT:
            result = {
                ...state,
                loginStatus: false, 
                loggedUser: null
            };
            return result;
        default:
           return { ...state };
    }
}

export default reducer;