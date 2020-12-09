
import * as userReducer from "./userReducer" 
import * as applicationReducer from "./applicationReducer"

import { combineReducers } from "redux";

export const rootReducer = combineReducers(
    { 
        userState: userReducer.reducer, 
        applicationState: applicationReducer.reducer,
        
    }
);

export const initialState = { 
    userState: userReducer.initState, 
    applicationState: applicationReducer.initState,
}

export default rootReducer;