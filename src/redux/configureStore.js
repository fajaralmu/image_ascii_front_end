import { createStore, applyMiddleware } from 'redux'
import { initialState, rootReducer } from './reducers'
import * as userMiddleware from '../middlewares/UserMiddleware'
import { storeApplicationData } from './../middlewares/ApplicationMiddleware';

const POST_METHOD = "POST";

export const configureStore = () => {
    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(  

            //user related
            userMiddleware.performLoginMiddleware,
            userMiddleware.performLogoutMiddleware,
            userMiddleware.requestAppIdMiddleware,
            //meeting notes
            storeApplicationData
        )
    );

    return store;
}  

export default configureStore;