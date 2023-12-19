export type BasicNode = {
    name: string,
    type?: string,
    isArray?: boolean,
    isPrimary?: boolean,
}

export type TreeNode = {
    id: string,
    name: string,
    type?: string,
    path: string,
    isArray?: boolean,
    isPrimary?: boolean,
    children?: TreeNode[]
};

export type Linage = {
    type?: string,
    expression?: string,
    inherit?: string,
    transform?: string,
    fromRegex?: string,
    toRegex?: string,
    primary?: boolean,
    variables?: Map<string, string>,
}