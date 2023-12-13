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

export const stringifyLinage = (info?: Linage) => {
    // console.log(info);
    if (info?.inherit != null) {
        return ` <- ${info?.inherit}`
    } else if (info?.expression != null) {
        const match = info?.expression.matchAll(/\${\d+}/g);
        let copy = info.expression;
        Array.from(match).forEach((item) => {
            copy = copy.replaceAll(`${item[0]}`, info?.variables?.get(item[0] as string) ?? '');

            console.log(item)
        });
        return ` <- ${copy}`
    } else if (info?.transform != null) {
        return ` <- ${info.transform} : ${info.fromRegex} -> ${info.toRegex}`
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