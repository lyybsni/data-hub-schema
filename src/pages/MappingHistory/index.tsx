import {Button, Chip} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {getHistory} from "../shared/History";
import React, {useEffect} from "react";
import {css} from "@emotion/css";
import {GridColDef} from "@mui/x-data-grid/models/colDef/gridColDef";

export const History = () => {

    const [rows, setRows] = React.useState([] as any[]);

    const trailOperations = ['resolveCSVSchema', 'resolveJSONSchema'];
    const clientOperations = ['read', 'write'];

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 70, headerAlign: 'center'},
        {
            field: 'type', headerName: 'Type', width: 180,
            align: "center", headerAlign: 'center',
            renderCell: (params: any) => {
                const trail = trailOperations.includes(params.row.operation ?? '');
                const client = clientOperations.includes(params.row.operation ?? '');
                return <div>
                    <Chip label={trail ? 'Trail' : 'Production'} variant={trail ? 'outlined' : 'filled'}/>
                    {client ? <Chip label={'Client'} variant={'outlined'}/> : <div/>}
                </div>
            }
        },
        {
            field: 'operation',
            headerName: 'Operation',
            headerAlign: 'center',
            width: 250
        },
        {field: 'remarks', headerName: 'Remarks', headerAlign: 'center', width: 600},
        {
            field: 'status', headerName: 'Status', headerAlign: 'center', width: 150, align: "center",
            renderCell: (params: any) => {
                return <span><Button
                    color={params.row.status !== 'FAILED' ? 'primary' : 'error'}>{params.value}</Button></span>
            }
        },
        {
            field: 'time', headerName: 'Time', headerAlign: 'center', width: 300,
            valueFormatter: (params: any) => {
                return new Date(params.value).toLocaleString();
            }
        },
    ];

    useEffect(() => {
        getHistory().then(data => data.map((item, index) => {
            return {
                ...item,
                id: index + 1,
            }
        }))
            .then(setRows);
    }, []);

    return <div>
        <h2 className={css`text-align: left;
          padding-left: 12px`}>Log</h2>
        <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
                pagination: {
                    paginationModel: {page: 0, pageSize: 10},
                },
            }}
            pageSizeOptions={[10, 100]}
            // checkboxSelection
        />
    </div>;


}