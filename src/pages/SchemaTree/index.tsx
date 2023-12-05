import SchemaTreeComponent, {TreeNode} from "../../components/SchemaTree/SchemaTree";
import {ApplicantSchema} from "../../resource/ApplicantSchema";
import React, {useEffect, useState} from "react";
import {Button, Input, InputLabel, MenuItem, Select} from "@mui/material";
import {schemaTreeMappingToJson} from "../../components/SchemaTree/SchemaTreeFormatter";
import {saveFile} from "../../utils/File"
import {getSchemaList} from "./Schema";

const SchemaTreePage = () => {

    const [treeData, setTreeData] = React.useState([] as TreeNode[]);
    const [exportData, setExportData] = React.useState([] as any[]);
    const [schemaList, setSchemaList] = React.useState([] as any[]);
    const [selectedSchema, setSelectedSchema] = React.useState('');

    const [files, setFiles] = useState("");

    const getSelection = () => {
        const list = getSchemaList();
        list.then((res) => {
            return res.map((item) => {
                const schema = JSON.parse(item.schema);
                return (<MenuItem value={item.id} key={item.id}>
                    {Object.keys(schema)[0]}
                </MenuItem>)
            })
        }).then(setSchemaList);
    }

    useEffect(() => {
        getSelection();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target || !e.target.files) {
            return false;
        }
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = e => {
            // console.log("e.target.result", e.target?.result);
            setFiles(e.target?.result as string);
        };
    };

    const getMappingBlob = () => {
        const processedExportedData = JSON.stringify(schemaTreeMappingToJson(exportData));
        return saveFile(
            new Blob([processedExportedData], {type: 'application/json'}),
            "mapping.json"
        );
    }

    const getOriginalSchemaBlob = () => {
        const processedExportedData = JSON.stringify(treeData);
        return saveFile(new Blob([processedExportedData], {type: 'application/json'}),
            "schema.json");
    }

    return (
        <div className={"tree-container"}>

            <div id="selection">
                <Select id="schema" value={selectedSchema} onChange={(e) => setSelectedSchema(e.target.value as string)}>{schemaList}</Select>
            </div>

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
            <div className="button-group">
                <Button>
                    <InputLabel htmlFor='import-schema'>
                        Import Schema
                    </InputLabel>
                    <Input type="file"
                           id='import-schema'
                           name='import-schema'
                           style={{display: 'none'}}
                           onChange={handleChange}/></Button>
                <Button onClick={getOriginalSchemaBlob}>Export Schema</Button>
                <Button>
                    <InputLabel htmlFor='import-mapping'>
                        Import Mapping
                    </InputLabel>
                    <Input type="file"
                           id='import-mapping'
                           name='import-mapping'
                           style={{display: 'none'}}
                           onChange={handleChange}/>
                </Button>
                <Button onClick={getMappingBlob}>Export Mapping</Button>
            </div>
        </div>);
}

export default SchemaTreePage;