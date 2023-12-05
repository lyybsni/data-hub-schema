import SchemaTreeComponent from "../../components/SchemaTree/SchemaTree";
import {ApplicantSchema} from "../../resource/ApplicantSchema";
import React, {useEffect, useState} from "react";
import {Button, Input, InputLabel, MenuItem, Select} from "@mui/material";
import {jsonToSchemaTree, schemaTreeMappingToJson} from "../../components/SchemaTree/SchemaTreeFormatter";
import {saveFile} from "../../utils/File"
import {getMapping, getMappingUnder, getSchemaList, updateMapping} from "./Schema";
import {TreeNode} from "../../components/SchemaTree/TreeNode";

const SchemaTreePage = () => {

    const [treeData, setTreeData] = React.useState([] as TreeNode[]);
    const [exportData, setExportData] = React.useState([] as any[]);

    const [schemaList, setSchemaList] = React.useState([] as any[]);
    const [mappingList, setMappingList] = React.useState([] as any[]);

    const [selectedSchema, setSelectedSchema] = React.useState('');
    const [selectedMapping, setSelectedMapping] = React.useState('');

    const [mappingData, setMappingData] = React.useState(new Map<string, string>());

    const [files, setFiles] = useState("[{}]");

    useEffect(() => {
        // load the data from back end
        const list = getSchemaList();
        list.then((res) => {
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
            getMappingUnder(selectedSchema).then((res) => {
                return res.map((item) => {
                    console.log(item)
                    return (<MenuItem value={item.id} key={item.id}>
                        {item.id}
                    </MenuItem>)
                })
            }).then(setMappingList);
    }, [selectedSchema]);

    useEffect(() => {
        console.log(files)
        if (files === '[{}]') {
            console.log("IAM")
            return;
        }

        const initTreeNode: TreeNode = {
            id: 'root',
            name: 'root',
            path: 'root',
            children: []
        }

        const schema = JSON.parse(files)[0];
        jsonToSchemaTree(schema, initTreeNode);
        setTreeData(initTreeNode.children ?? []);
        // console.log(treeData, initTreeNode.children);
    }, [files, setTreeData]);

    useEffect(() => {
        if (!selectedMapping) {
            return;
        }
         getMapping(selectedMapping).then(
            result => {
                const data = new Map<string, string>();
                Array.from(JSON.parse(result.mapping)).forEach((item: any) => {
                  data.set(item.key, item.value);
                });
                console.log(result.mapping, data);
                setMappingData(data);
            }
        )
    }, [selectedMapping]);

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
            <div id="trees">
                <div id='left-container'>
                <SchemaTreeComponent
                    initialTreeData={treeData}
                    fetchData={setTreeData}
                />
                </div>

                <div id='right-container'>
                    <div id="schema-selection">
                        <InputLabel htmlFor='schema'>Current Schema</InputLabel>
                        <Select id="schema" value={selectedSchema} onChange={(e) => setSelectedSchema(e.target.value as string)}>{schemaList}</Select>
                    </div>
                    <div id="mapping-selection">
                        <InputLabel htmlFor='mapping'>Current Mapping</InputLabel>
                        <Select id="mapping" value={selectedMapping} onChange={(e) => {
                            const mappingId = e.target.value as string;
                            setSelectedMapping(mappingId);
                        }}>{mappingList}</Select>
                    </div>
                <SchemaTreeComponent
                    initialTreeData={[ApplicantSchema]}
                    linkedTreeData={treeData}
                    enableAddField={false}
                    enableLinkField={true}
                    linageMap={mappingData}
                    exportData={(data) => {setExportData(data); console.log(data);}}
                />
                </div>
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
                {/*<Button>*/}
                {/*    <InputLabel htmlFor='import-mapping'>*/}
                {/*        Import Mapping*/}
                {/*    </InputLabel>*/}
                {/*    <Input type="file"*/}
                {/*           id='import-mapping'*/}
                {/*           name='import-mapping'*/}
                {/*           style={{display: 'none'}}*/}
                {/*           onChange={handleChange}/>*/}
                {/*</Button>*/}
                <Button onClick={getMappingBlob}>Export Mapping</Button>
                <Button onClick={() => updateMapping(selectedSchema, JSON.stringify(exportData))}>Save Mapping</Button>
            </div>
        </div>);
}

export default SchemaTreePage;