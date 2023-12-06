import React from 'react';
import './App.css';
import SchemaTreePage from "./pages/SchemaTree";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Box} from "@mui/material";
import {SchemaManagementPage} from "./pages/SchemaManagement";

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

            <div id='main-container'>
                <RouterProvider router={router}/>
            </div>

            <Box id='footer'>
                @2023 PolyU Graduate School
            </Box>


        </div>
    );
}

export default App;
