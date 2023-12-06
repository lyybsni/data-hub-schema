export type TreeNode = {
    id: string,
    name: string,
    type?: string,
    path: string,
    isArray?: boolean,
    children?: TreeNode[]
};