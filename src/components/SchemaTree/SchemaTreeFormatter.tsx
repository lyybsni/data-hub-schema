const schemaTreeMappingToJson = (nodes: any[]) => {
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

const jsonToSchemaTree = (json: any) => {

}

export {
    schemaTreeMappingToJson,
    jsonToSchemaTree
};