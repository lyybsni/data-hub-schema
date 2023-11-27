import SchemaTreeComponent, {TreeNode} from "./SchemaTree";
import {ApplicantSchema} from "../resource/ApplicantSchema";
import React from "react";
import {Button} from "@mui/material";


const SchemaTreePage = () => {

    const [treeData, setTreeData] = React.useState([] as TreeNode[]);
    const [exportData, setExportData] = React.useState([] as any[]);

    const saveFile = async (blob: Blob) => {
        const a = document.createElement('a');
        a.download = 'schema.json';
        a.href = URL.createObjectURL(blob);
        a.addEventListener('click', () => {
            setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
        });
        a.click();
    };

    return (
        <div className={"tree-container"}>
            <div id="trees">
            <SchemaTreeComponent
                fetchData={setTreeData}
            />
            <SchemaTreeComponent
                initialTreeData={[ApplicantSchema]}
                linkedTreeData={treeData}
                enableAddField={false}
                enableLinkField={true}
                exportData={setExportData}
            />
            </div>
            <div id="button-group">
                <Button>Import</Button>
                <Button
                    onClick={() => {saveFile(new Blob([JSON.stringify(exportData)], {type: 'application/json'}))}}
                >Export</Button>
            </div>
        </div>);
}

export default SchemaTreePage;