import SchemaTreeComponent from "../../components/SchemaTree/SchemaTree";
import React, {useEffect} from "react";
import {TreeNode} from "../../components/SchemaTree/TreeNode";
import {Button, Checkbox, InputLabel, MenuItem, Select} from "@mui/material";
import './SchemaManagement.css'
import {createSchema, getSchema, getSchemaList, updateSchema} from "../shared/Schema";

const CreateSchema = (props: {
    selectedSchema: string,
    setSelectedSchema: (schema: string) => void,
    schemaList?: any[],
    display?: boolean
    }) => {
    return (
        <div id='schema-page-selection-group' style={{display: props.display ? 'flex' : 'none'}}>
            <InputLabel htmlFor='schema'>Current Schema</InputLabel>
            <Select id="schema" value={props.selectedSchema} onChange={(e) => props.setSelectedSchema(e.target.value as string)}>{props.schemaList}</Select>
        </div>
    );
};

export const SchemaManagementPage = () => {
    const initTreeData = [{
        id: '1',
        name: 'Input Root',
        children: [],
        path: 'root'
    } as TreeNode];

    const [treeData, setTreeData] = React.useState([] as TreeNode[]);
    const [selectedSchema, setSelectedSchema] = React.useState('' as string);
    const [createSchemaMode, setCreateSchemaMode] = React.useState(false as boolean);
    const [schemaList, setSchemaList] = React.useState([] as any[]);

    useEffect(() => {
        getSchemaList().then((res) => {
            return res.map((item) => {
                const schema = JSON.parse(item.schema);
                return (<MenuItem value={item.id} key={item.id}>
                    {Object.keys(schema)[0]}
                </MenuItem>)
            })
        }).then(setSchemaList);
    }, []);

    useEffect(() => {
        if (selectedSchema)
            getSchema(selectedSchema).then((res) => {
                console.log(res);
                setTreeData(JSON.parse(res.schema));
            });
    }, [selectedSchema]);

    const handleSubmitSchema = () => {
        if (selectedSchema) {
            console.log(treeData);
            updateSchema(selectedSchema, JSON.stringify(treeData)).then((res) => {
                console.log(res);
            });
        } else {
            createSchema(JSON.stringify(treeData)).then((res) => {
                console.log(res);
            });
        }
    };

    return (
        <div id='schema-page-container'>
            <div id='schema-page-create-or-modify'>
                <Checkbox id='create-schema' checked={createSchemaMode}
                onChange={(e) => {
                    setCreateSchemaMode(e.target.checked);
                    setSelectedSchema('');
                    setTreeData(e.target.checked ? initTreeData : []);
                }}/>
                <InputLabel htmlFor='create-schema'>Create New Schema</InputLabel>
            </div>
            <CreateSchema
                display={!createSchemaMode}
                selectedSchema={selectedSchema}
                setSelectedSchema={setSelectedSchema}
                schemaList={schemaList}
            />
            <SchemaTreeComponent
                initialTreeData={treeData}
                fetchData={setTreeData}
            />
            <div id='schema-page-button-group'>
                <Button onClick={handleSubmitSchema}>Upload Schema</Button>
            </div>
        </div>
    )
}