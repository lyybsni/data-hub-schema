import {post} from "../../utils/Request";

export const trailRun = (data: string, schemaId: string, mappingId: string) => {
    return post(`/admin/try`, {
        schemaId: schemaId,
        mappingId: mappingId,
        json: data,
    });
}