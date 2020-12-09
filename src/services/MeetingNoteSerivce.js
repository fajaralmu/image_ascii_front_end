import * as url from '../constant/Url'
import { commonAuthorizedHeader } from '../middlewares/Common';
import { commonAjaxPostCalls } from './Promises';
import { contextPath } from './../constant/Url';
export default class MeetingNoteSerivce {
    static instance = MeetingNoteSerivce.instance || new MeetingNoteSerivce();

    list = (filter) => {
        const request = {
            code: 'notes',
            filter: filter
        }

        const endpoint = contextPath().concat("api/notes/list");
        return commonAjaxPostCalls(endpoint, request);
    }
    store = (meetingNote) => {

        const request = {
            meeting_note: meetingNote
        }

        const endpoint = url.contextPath().concat("api/notes/store");
        return commonAjaxPostCalls(endpoint, request);
    }

    view = (id) => {
        const endpoint = url.contextPath().concat("api/notes/view/"+id);
        return commonAjaxPostCalls(endpoint, {});
    }

}