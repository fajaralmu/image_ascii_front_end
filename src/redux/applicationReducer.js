import * as types from './types'

export const initState = {
    applicationData: {},
};

export const reducer = (state = initState, action) => {
    const result = state;
    switch (action.type) {
        case types.STORE_APPLICTION_DATA:
            const key = action.payload.key;
            const data = action.payload.data;
           
            result.applicationData[key] = data

            return result;
        case types.REMOVE_APPLICTION_DATA:
            
            delete result[action.payload.key];
            return result;
        default:
            return { ...state };

    }
}

export default reducer;