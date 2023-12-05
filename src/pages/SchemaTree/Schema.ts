import {get} from "../../utils/Request";

export type Schema = {
    id: string,
    schema: string,
}

export const getSchemaList = () => {
    return get('/admin/schemas').then(res => {
        console.log(res);
        const result = [] as Schema[];
        res.forEach((item: any) => {
            result.push({
                id: item.id,
                schema: item.schema,
            })
        });
        return result;
    })
}