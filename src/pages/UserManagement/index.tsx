import {Button, Checkbox, MenuItem, MenuList, Paper} from "@mui/material";
import React, {useEffect} from "react";
import {css} from "@emotion/css";
import {getProjects, getUsers, Project, User} from "../../components/shared/Users";
import {DataGrid} from "@mui/x-data-grid";
import {GridColDef} from "@mui/x-data-grid/models/colDef/gridColDef";
import {CheckBoxOutlineBlank, CheckBoxOutlined} from "@mui/icons-material";

const RoleManagement = (
    props: {
        data: User[]
    }
) => {

    const columns: GridColDef[] = [
        {field: 'username', headerName: 'User Name', width: 200},
        {field: 'role', headerName: 'User Type', width: 200,
        valueFormatter: (params) => {
            return params.value === 'END_USER' ? 'End User' : params.value === 'ADMIN' ? 'Admin' : 'Super Admin';
        }
        },
        {field: 'privilegeType', headerName: 'Privileges', width: 200,
        valueFormatter: (params) => {
            return params.value === 'READ' ? 'Read Only' : 'Read and Write';
        }
        },
    ]

    return <div>
        <div className={css`text-align: left`}>
            <span><Button>Create New User</Button></span>
        </div>
        <DataGrid columns={columns} rows={props.data}/>
    </div>;
}

const ProjectManagement = (
    props: {
        data: Project[]
    }
) => {

    const columns: GridColDef[] = [
        {field: 'name', headerName: 'Project Name', width: 200},
        {field: 'contactPerson', headerName: 'Contact Person', width: 200},
        {field: 'clientId', headerName: 'Client ID', width: 200},
        {field: 'whiteList', headerName: 'White List', width: 200,
            renderCell: (params) => {
            return params.row.whiteList ? <CheckBoxOutlined/> : <CheckBoxOutlineBlank/>;
            }
        },
        {field: 'specifiedSchemas', headerName: 'Schema List', width: 200},
    ];

    return <div>
        <div className={css`text-align: left`}>
            <span><Button>Create New Project</Button></span>
        </div>
        <DataGrid columns={columns} rows={props.data}/>
    </div>
}

export const UserManagement = () => {

    const [currentSelection, setCurrentSelection] = React.useState('' as string);

    const [userList, setUserList] = React.useState([] as User[]);
    const [projectList, setProjectList] = React.useState([] as Project[]);

    useEffect(() => {
        getUsers().then((res) => {
            setUserList(res);
        });
        getProjects().then((res) => {
            setProjectList(res);
        });
    }, []);

    return <div className={userManagementStyle}>
        <Paper className={menuListStyle}>
            <h4>Functions</h4>
            <MenuList>
                <MenuItem onClick={() => setCurrentSelection('role')}>User Role Management</MenuItem>
                <MenuItem onClick={() => setCurrentSelection('project')}>Project Management</MenuItem>
            </MenuList>
        </Paper>
        <Paper className={contentStyle}>
            {currentSelection === 'role' ? <RoleManagement data={userList}/> : <ProjectManagement data={projectList}/>}
        </Paper>
    </div>;
}

const userManagementStyle = css`
    display: flex;
    flex-direction: row;
  justify-content: space-between;
`;

const menuListStyle = css`
    min-width: 20%;
`;

const contentStyle = css`
  min-width: calc(80% - 12px);  
`;