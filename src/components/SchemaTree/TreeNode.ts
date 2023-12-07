export type BasicNode = {
    name: string,
    type?: string,
    isArray?: boolean,
}

export type TreeNode = {
    id: string,
    name: string,
    type?: string,
    path: string,
    isArray?: boolean,
    children?: TreeNode[]
};