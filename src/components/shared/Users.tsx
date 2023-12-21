import {get} from "../../utils/Request";

export type User = {
    id: string,
    username: string,
    role: 'END_USER' | 'ADMIN' | 'SUPER_ADMIN',
    privilegeType: 'READ' | 'READ_WRITE',
}

export type Project = {
    id: string,
    name: string,
    clientId: string,
    contactPerson: string,
    whiteList: boolean,
    specifiedSchemas: string[]
}

export const getUsers = () => {
    return get("/admin/users") as Promise<User[]>;
}

export const getProjects = () => {
    return get("/admin/projects") as Promise<Project[]>;
}