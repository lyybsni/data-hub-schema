import {Linage, TreeNode} from "./TreeNode";
import {SchemaResolve} from "../../pages/shared/Schema";


export const fieldResolver = (schemaResolve: SchemaResolve) => {

    console.log(schemaResolve);

    const root = {
        id: schemaResolve.name,
        name: schemaResolve.name,
        path: schemaResolve.name,
        children: [],
    } as TreeNode;

    if (schemaResolve.fields) {
        const sorted = schemaResolve.fields.sort((a, b) => {
            if (a.path && b.path) {
                if (a.path < b.path) return -1;
                else if (a.path > b.path) return 1;
                else return 0;
            }
            else return 0;
        });

        sorted.forEach((child) => {
            let parent = root;
            const paths = child.path?.split('.').slice(0, -1);
            paths?.forEach((path) => {
                let found = parent.children?.find((item) => item.name === path);

                if (found) {
                    parent = found;
                } else {
                    const node = {
                        id: path,
                        name: path.replaceAll("[0]", ''),
                        isArray: path.endsWith("[0]"),
                        path: parent.path + '.' + path,
                        children: [],
                    } as TreeNode;
                    parent.children?.push(node);
                    parent = node;
                }
            });

            const node = {
                ...child
            } as TreeNode;
            parent.children?.push(node);
        });
    }

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