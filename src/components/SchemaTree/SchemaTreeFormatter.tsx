import {Linage, TreeNode} from "./TreeNode";
import {SchemaResolve} from "../../pages/shared/Schema";

export const schemaTreeMappingToJson = (nodes: any[]) => {
    return nodes;
}

export const fieldResolver = (schemaResolve: SchemaResolve) => {

    console.log(schemaResolve);

    const root = {
        id: schemaResolve.name,
        name: schemaResolve.name,
        path: schemaResolve.name,
        children: [],
    } as TreeNode;

    schemaResolve.fields?.forEach((child) => {
        root.children?.push({
            id: child.name,
            name: child.name,
            type: child.type,
            path: root.path + '.' + child.name,
            children: []
        })
    });

    return root;
}

export const stringifyLinage = (info: Linage | null) => {
    console.log(info);
    if (info?.inherit) {
        return ` <- ${info?.inherit}`
    } else if (info?.expression) {
        const match = info?.expression.matchAll(/(?<=\${)\d+(?=})/g);
        let copy = info.expression;
        Array.from(match).forEach((item) => {
            copy = copy.replaceAll(`${item.input}`, info?.variables?.get(item.input as string) ?? '');
        });
        return ` <- ${copy}`
    }
    return '';
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