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
import {UserGuide} from "./pages/UserGuide";

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
        },
        {
            path: "/guide",
            element: <UserGuide/>
        }
    ]);

    const dispatch = useDispatch();
    const alert = useSelector((state: any) => state.alert);
    const handleAlertClose = () => {
        dispatch(closeAlert());
    }

    const location = window.location.href;

    const locationMap = [
        ['/guide', 'User Guide'],
        ['/schema', 'Schema Management'],
        ['/mapping', 'Schema Mapping'],
        ['/example', 'Mapping Trials'],
        ['/history', 'Logs and Histories'],
        ['/user', 'Account (Mock User 3)'],
    ];

    console.log(location.includes('/guide'));

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
                {locationMap.map(item => {
                    return <a href={item[0]}
                              className={location.includes(item[0]) ? selectedStyle : linkStyle}>{item[1]}</a>
                })}
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

const selectedStyle = css`
  color: beige;
  text-decoration: none;
  font-weight: bold;
`;

const linkStyle = css`
  color: white;
  text-decoration: none;
`;

export default App;
