
import { commonAjaxPostCalls } from './Promises';
import { contextPath } from './../constant/Url';
export default class UserService{
    static instance = UserService.instance || new UserService();
    
    constructor(props){
    }

    updateProfile = (user) => {
        const request = {
            'userModel':user
        }

        const endpoint = contextPath().concat("api/accountdashboard/updateprofile");
        return commonAjaxPostCalls(endpoint, request);
    }
}