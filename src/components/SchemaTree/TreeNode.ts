export type TreeNode = {
    id: string,
    name: string,
    children?: TreeNode[]
    path: 'root' | string,
    linkedPath?: string,
};