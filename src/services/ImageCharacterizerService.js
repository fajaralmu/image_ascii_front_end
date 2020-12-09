
import { contextPath } from '../constant/Url';
import { commonAjaxPostCalls } from './Promises';

export default class ImageCharacterizerService
{
    static instance = ImageCharacterizerService.instance || new ImageCharacterizerService();

    constructor() {

    }

    //public//
    characterize = (request) => {
        const endpoint = contextPath().concat("api/app/characterize");
        return commonAjaxPostCalls(endpoint, request);
    }
}