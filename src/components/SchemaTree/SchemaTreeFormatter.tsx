import {TreeNode} from "./TreeNode";

export const schemaTreeMappingToJson = (nodes: any[]) => {
    const result = {} as any;

    nodes.forEach(node => {
        const targetPath = Object.keys(node)[0];
        const sourcePath = node[targetPath].from;

        let root = result;
        targetPath.toString().split('.').forEach((key: string) => {
            if (!root[key]) {
                root[key] = {};
            }
            root = root[key];
        })
        root['from'] = sourcePath.split("root.")[1];
    })
    return result;
}


export const jsonToSchemaTree = (json: any, root: TreeNode) => {
    if (!json['id']) return;

    let node: TreeNode = {
        id: json['id'],
        name: json['name'],
        path: root.path + '.' + json['name'],
        children: []
    };

    json['children']?.forEach((child: any) => {
        jsonToSchemaTree(child, node);
    });
    root.children?.push(node);
}