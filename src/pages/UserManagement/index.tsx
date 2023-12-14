import {Chip, MenuItem, MenuList, Paper, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import React from "react";
import {css} from "@emotion/css";

const RoleManagement = () => {
    return <div>
        <Table>
            <TableHead>
                <TableRow className={css`th {font-weight: bold}`}>
                    <TableCell>Role Name</TableCell>
                    <TableCell>Role Type</TableCell>
                    <TableCell>Privileges</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell>Mock User 1</TableCell>
                    <TableCell>Manager</TableCell>
                    <TableCell><Chip label={'schema'}/><Chip label={'mapping'}/></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Mock User 2</TableCell>
                    <TableCell>User</TableCell>
                    <TableCell><Chip label={'mapping'}/></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Mock User 3</TableCell>
                    <TableCell>Super Manager</TableCell>
                    <TableCell><Chip label={'user'}/><Chip label={'schema'}/><Chip label={'mapping'}/></TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
}

const ProjectManagement = () => {
    return <div>
        <Table>
            <TableHead>
                <TableRow className={css`th {font-weight: bold}`}>
                    <TableCell>Project</TableCell>
                    <TableCell>Contact Person</TableCell>
                    <TableCell>Client ID</TableCell>
                    <TableCell>Schema List</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell>e-Admission Service</TableCell>
                    <TableCell>Mrs. Cheng</TableCell>
                    <TableCell>1001</TableCell>
                    <TableCell><Chip label='applicant'/><Chip label='supervisor'/></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Applicant Visualization Service</TableCell>
                    <TableCell>Mr. Li</TableCell>
                    <TableCell>1004</TableCell>
                    <TableCell><Chip label='applicant'/></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Academic Regulation Service</TableCell>
                    <TableCell>Mrs. Chan</TableCell>
                    <TableCell>1017</TableCell>
                    <TableCell><Chip label='applicant'/><Chip label='supervisor'/></TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
}

export const UserManagement = () => {

    const [currentSelection, setCurrentSelection] = React.useState('' as string);

    return <div className={userManagementStyle}>
        <Paper className={menuListStyle}>
            <h4>Functions</h4>
            <MenuList>
                <MenuItem onClick={() => setCurrentSelection('role')}>User Role Management</MenuItem>
                <MenuItem onClick={() => setCurrentSelection('project')}>Project Management</MenuItem>
            </MenuList>
        </Paper>
        <Paper className={contentStyle}>
            {currentSelection === 'role' ? <RoleManagement/> : <ProjectManagement/>}
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