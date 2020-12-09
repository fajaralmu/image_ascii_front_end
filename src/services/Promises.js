
import { commonAuthorizedHeader } from './../middlewares/Common';

const axios = require('axios')

export const rejectedPromise = (message) => {
    return new Promise((res,rej) => {
        rej(message);
    });
}

export const emptyPromise =  (defaultResponse) => new Promise(function(res, rej){
    res(defaultResponse);
});

export const commonAjaxPostCalls = (endpoint, payload = null) => {
    const request = payload == null ? {} : payload;
    return new Promise(function (resolve, reject) {
        axios.post(endpoint, request, {
            headers: commonAuthorizedHeader()
        })
        .then(response => response.data)
        .then(function (response) {
            if (response.code == "00") 
            { resolve(response); }
            else 
            { reject(response); }
        })
        .catch((e) => { console.error(e); reject(e); });
    })
}