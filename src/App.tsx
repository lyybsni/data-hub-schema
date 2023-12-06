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

            <Box sx={{display: 'flex', 'justify-content': 'space-evenly'}}>
                <a href='/schema'>Schema Management</a>
                <a href='/mapping'>Schema Mapping</a>
            </Box>

            <div>
                <RouterProvider router={router}/>
            </div>

        </div>
    );
}

export default App;
