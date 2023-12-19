import {Linage, TreeNode} from "../../components/SchemaTree/TreeNode";
import React, {useMemo} from "react";
import {DataGrid, GridRowSelectionModel} from "@mui/x-data-grid";
import {GridColDef} from "@mui/x-data-grid/models/colDef/gridColDef";
import {Button} from "@mui/material";

const convertName = (name: string) => {
    const convertKebabCase = (name: string) => {
        return name.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
    }
    const convertCamelCase = (name: string) => {
        return name.replace(/[a-z](_[a-z])/g, (match) => {
            return match.replace(/_/g, '').toUpperCase();
        })
    }
    return new Set<string>([name, convertCamelCase(name), convertKebabCase(name)]);
}

export const ExtractNamePopUp = (
    props: {
        originalTreeData: TreeNode[],
        targetTreeData: TreeNode[],
        onApply?: (linage: Map<string, Linage>) => void,
    }) => {

    const [rowSelectionModel, setRowSelectionModel] = React.useState<GridRowSelectionModel>([]);

    const displayData = useMemo(() => {
        const result = [] as any[];

        const processTreeData = (treeNode: TreeNode, originalMap: Map<string, string[]>) => {
            const add = treeNode.path;

            if (!originalMap.has(treeNode.name)) {
                originalMap.set(treeNode.name, []);
            }
            originalMap.set(treeNode.name, [...originalMap.get(treeNode.name)!, add]);


            treeNode.children?.forEach((child) => {
                processTreeData(child, originalMap);
            })
        }

        const extractName = (treeNode: TreeNode, originalMap: Map<string, string[]>) => {
            if ((!treeNode.children || treeNode.children?.length === 0)) {
                const allowedName = convertName(treeNode.name);
                allowedName.forEach((name) => {
                    if (originalMap.has(name)) {
                        const temp = originalMap.get(name)!;
                        temp.forEach((item, index) => {
                            result.push({
                                id: `${treeNode.path}-${index}}`,
                                name: treeNode.name,
                                path: treeNode.path,
                                originalPath: item,
                            });
                        })
                    }
                });
            }
            treeNode.children?.forEach((child) => {
                extractName(child, originalMap);
            })
        }

        const originalMap = new Map<string, string[]>();
        processTreeData(props.originalTreeData[0], originalMap);
        extractName(props.targetTreeData[0], originalMap);
        console.log("RESULT", result);
        return result;
    }, [props.originalTreeData, props.targetTreeData])

    const columns: GridColDef[] = [
        {field: 'path', headerName: 'Path', width: 300},
        {field: 'originalPath', headerName: 'Original Path', width: 600},
    ];

    return <div><DataGrid
        checkboxSelection
        onRowSelectionModelChange={setRowSelectionModel}
        columns={columns}
        rows={displayData}
        getRowId={row => row.id}/>
        <Button onClick={() => {
            const result = new Map<string, Linage>();
            rowSelectionModel.forEach((item) => {
                const ref = displayData.find((row) => row.id === item);
                result.set(ref!.path, {inherit: ref!.originalPath});
            });
            props.onApply?.(result);
        }}>Match</Button>
    </div>
}