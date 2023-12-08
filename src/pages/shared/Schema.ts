import {get, post, put} from "../../utils/Request";

export type Schema = {
    id: string,
    schema: any,
}

export type Field = {
    name: string,
    type: string,
}

export type SchemaResolve = {
    name: string,
    fields: Field[],
}

export const getSchema = async (schemaId: string) => {
    return await get(`/admin/schema/${schemaId}`);
}

export const getSchemaList = async (): Promise<Schema[]> => {
    const res = await get('/admin/schemas');
    // console.log(res);
    const result = [] as Schema[];
    res.forEach((item: any) => {
        result.push({
            id: item.id,
            schema: JSON.parse(item.schema)[0],
        });
    });
    return result;
}

export const createSchema = async (schema: any) => {
    return await post(`/admin/schema`, {
        schema: schema,
    });
}

export const updateSchema = async (schemaId: string, schema: any) => {
    return await put(`/admin/schema/${schemaId}`, {
        id: schemaId,
        schema: schema,
    });
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

export const uploadCSVFile = async(
    file: File,
) : Promise<Response> => {
    const formData = new FormData();
    formData.append('file', file);
    return await post(`/admin/schema-from-csv`, formData, 'multipart/form-data');
};