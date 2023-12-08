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

export type Linage = {
    type?: string,
    expression?: string,
    inherit?: string,
    transform?: string,    // TODO: change name
    fromRegex?: string,
    toRegex?: string,

    variables?: Map<string, string>,
}