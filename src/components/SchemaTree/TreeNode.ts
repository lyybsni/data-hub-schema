export type TreeNode = {
    id: string,
    name: string,
    path: string,
    isArray?: boolean,
    children?: TreeNode[]
};