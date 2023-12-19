import {Linage} from "../SchemaTree/TreeNode";
import {DataGrid} from "@mui/x-data-grid";
import {GridColDef} from "@mui/x-data-grid/models/colDef/gridColDef";
import {stringifyLinage} from "../SchemaTree/SchemaTreeFormatter";

export const MappingRule = (props: {
    data: Map<string, Linage>,
}) => {

    const rows: any[] = [];
    props.data.forEach((value, key) => {
        rows.push({
            id: key,
            ...value
        });
    });

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 150},
        {field: 'type', headerName: 'Casting', width: 150,
            valueGetter: (params) => {
                switch(true) {
                    case !!params.row.expression:
                        return 'Expression';
                    case !!params.row.inherit:
                        return 'Inherit';
                    case !!params.row.transform:
                        return 'Transform';
                }
            }
        },
        {
            field: 'Remark', headerName: 'Remarks', width: 450,
            valueGetter: (params) => {
                return stringifyLinage({...params.row} as Linage)
            }
        }
        // {field: 'expression', headerName: 'Expression', width: 150},
        // {field: 'inherit', headerName: 'Inherit', width: 150},
        // {field: 'transform', headerName: 'Transform', width: 150},
    ]

    return <DataGrid columns={columns} rows={rows}/>

}