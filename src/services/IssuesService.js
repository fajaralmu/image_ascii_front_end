
import { contextPath } from './../constant/Url';
import { commonAjaxPostCalls } from './Promises';

export default class IssuesService
{
    static instance = IssuesService.instance || new IssuesService();

    constructor() {

    }

    //public//
    departementList = () => {
        const endpoint = contextPath().concat("api/public/issues/departements");
        return commonAjaxPostCalls(endpoint, {});
    }
    storePublicIssue =(issue) => {
        const endpoint = contextPath().concat("api/public/issues/store");
        return commonAjaxPostCalls(endpoint, {
            issue:issue
        });
    }

    //authenticated//
    list = (filter) => {
        const request = {
            code: 'issue',
            filter: filter
        }

        const endpoint = contextPath().concat("api/issues/list");
        return commonAjaxPostCalls(endpoint, request);
    }
    view = (id) => {
        const endpoint = contextPath().concat("api/issues/view/"+id);
        return commonAjaxPostCalls(endpoint, {});
    }
    delete = (id) => {
        const endpoint = contextPath().concat("api/issues/delete/"+id);
        return commonAjaxPostCalls(endpoint, {});
    }
    followUpIssue = (followUp) => {
        const request = {
            followed_up_issue: followUp
        }

        const endpoint = contextPath().concat("api/issues/followup");
        return commonAjaxPostCalls(endpoint, request);
    }
}