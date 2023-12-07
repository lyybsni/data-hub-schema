import React from 'react';
import './App.css';
import SchemaTreePage from "./pages/SchemaTree";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Box} from "@mui/material";
import {SchemaManagementPage} from "./pages/SchemaManagement";
import {MappingExample} from "./pages/MappingExample";
import {css} from "@emotion/css";

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
        }
    ]);

    return (
        <div className="App">
            <header className="App-header">
                {/* <img src={logo} className="App-logo" alt="logo" /> */}
            </header>

            <Box id='nav-bar'>
                <a href='/schema'>Schema Management</a>
                <a href='/mapping'>Schema Mapping</a>
                <a href='/example'>Mapping Example</a>
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
