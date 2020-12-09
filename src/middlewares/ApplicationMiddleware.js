import * as types from '../redux/types'


export const storeApplicationData = store => next => action => {
    if (!action.meta || action.meta.type !== types.STORE_APPLICTION_DATA) {
        // console.debug("next: ", action)
        return next(action);
    }

    let newAction = Object.assign({}, action, {
        payload:  action.payload
    });
    delete newAction.meta;
    store.dispatch(newAction);

}

export const removeApplicationData = store => next => action => {
    if (!action.meta || action.meta.type !== types.REMOVE_APPLICTION_DATA) {
        return next(action);
    }

    let newAction = Object.assign({}, action, {
        payload:  action.payload
    });
    delete newAction.meta;
    store.dispatch(newAction);

}
