import {post} from "../../utils/Request";

export const trailRun = (data: string, schemaId: string, mappingId: string) => {
    return post(`/admin/try`, {
        schemaId: schemaId,
        mappingId: mappingId,
        json: data,
    });
}

export const run = async (data: File, mappingId: string) => {
    const formData = new FormData();
    formData.append('file', data);
    return await post(`/data-ingest/raw-file/${mappingId}?clientId=1`, formData, 'multipart/form-data');
}