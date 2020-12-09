
import { commonAjaxPostCalls } from './Promises';
import { contextPath } from './../constant/Url';

export default class DiscussionTopicsService
{
    static instance = DiscussionTopicsService.instance || new DiscussionTopicsService();

    constructor() {

    }

    store = (discussionTopic) => {

        const request = {
            discussion_topic: discussionTopic
        }

        const endpoint = contextPath().concat("api/discussiontopics/store");
        return commonAjaxPostCalls(endpoint, request);
    }

    list = (filter) => {
        const request = {
            code: 'discussion_topic',
            filter: filter
        }

        const endpoint = contextPath().concat("api/discussiontopics/list");
        return commonAjaxPostCalls(endpoint, request);
    }
    view = (id) => {
        const endpoint = contextPath().concat("api/discussiontopics/view/"+id);
        return commonAjaxPostCalls(endpoint, {});
    }
    // delete = (id) => {
    //     const endpoint = contextPath().concat("api/discussiontopics/delete/"+id);
    //     return commonAjaxPostCalls(endpoint, {});
    // }
    storeAction = (action) => {
        const request = {
            discussion_action: action
        }

        const endpoint = contextPath().concat("api/discussiontopics/action");
        return commonAjaxPostCalls(endpoint, request);
    }
}