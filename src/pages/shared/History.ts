import {get} from "../../utils/Request";

export const getHistory = () => {
    return get('/admin/history') as Promise<any[]>;
}