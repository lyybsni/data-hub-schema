import React from 'react';
import './App.css';
import SchemaTreePage from "./pages/Mapping";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Alert, Box, Snackbar} from "@mui/material";
import {SchemaManagementPage} from "./pages/SchemaManagement";
import {MappingExample} from "./pages/MappingExample";
import {css} from "@emotion/css";
import {History} from "./pages/MappingHistory";
import {UserManagement} from './pages/UserManagement';
import {useDispatch, useSelector} from "react-redux";
import {closeAlert} from "./redux/AlertSlice";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <SchemaTreePage/>
        },
        {
            path: "/mapping",
            element: <SchemaTreePage/>
        },
        {
            path: "/schema",
            element: <SchemaManagementPage/>
        },
        {
            path: "/example",
            element: <MappingExample/>
        }, {
            path: "/history",
            element: <History/>
        },
        {
            path: "/user",
            element: <UserManagement/>
        }
    ]);

    const dispatch = useDispatch();
    const alert = useSelector((state: any) => state.alert);
    const handleAlertClose = () => {
        dispatch(closeAlert());
    }

    return (
        <div className="App">
            <header className="App-header">
                {/* <img src={logo} className="App-logo" alt="logo" /> */}
            </header>

            <Snackbar open={alert.open}
                      autoHideDuration={2000}
                      onClose={handleAlertClose}>
                <Alert onClose={handleAlertClose} severity={alert.severity} sx={{ width: '100%' }}>
                    {alert.message}
                </Alert>
            </Snackbar>

            <Box id='nav-bar'>
                <a href='/schema'>Schema Management</a>
                <a href='/mapping'>Schema Mapping</a>
                <a href='/example'>Mapping Trials</a>
                <a href='/history'>Logs and Histories</a>
                <a href='/user'>Account (Mock User 3)</a>
            </Box>

            <div className={mainContainerStyle}>
                <RouterProvider router={router}/>
            </div>

            <Box id='footer'>
                @2023 PolyU Graduate School
            </Box>

        </div>
    );
}

const mainContainerStyle = css`
  margin-left: 3%;
  margin-right: 3%;
  min-height: calc(100vh - 105px);
  grid-auto-flow: column;
  padding-top: 30px;
`;

export default App;
