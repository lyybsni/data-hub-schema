import {get, post} from "../../utils/Request";

export type Schema = {
    id: string,
    schema: string,
}

export const getSchemaList = async () => {
    const res = await get('/admin/schemas');
    // console.log(res);
    const result = [] as Schema[];
    res.forEach((item: any) => {
        result.push({
            id: item.id,
            schema: item.schema,
        });
    });
    return result;
}

export const updateMapping = async (schemaId: string, mapping: any) => {
    return await post(`/admin/mapping`, {
        schemaId: schemaId,
        mapping: mapping,
    });
}

export const getMappingUnder = async (schemaId: string) => {
    const res = await get(`/admin/history/${schemaId}`);
    const result = [] as any[];
    res.forEach((item: any) => {
        result.push({
            id: item.id,
            name: item.name,
            path: item.path,
            linkedPath: item.linkedPath,
        });
    });
    return result;
}

export const getMapping = async (mappingId: string) => {
    return await get(`/admin/mapping/${mappingId}`);
}