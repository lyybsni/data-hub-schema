import SchemaTreeComponent from "../../components/SchemaTree/SchemaTree";
import React, {ReactElement, useEffect, useMemo, useState} from "react";
import {Button, FormControl, FormControlLabel, Input, ListItem, Paper} from "@mui/material";
import {fieldResolver, jsonToSchemaTree, stringifyLinage} from "../../components/SchemaTree/SchemaTreeFormatter";
import {saveFile} from "../../utils/File"
import {getSchema, uploadMapping, uploadCSVFile, updateMapping, uploadJSONExample} from "../shared/Schema";
import {Linage, TreeNode} from "../../components/SchemaTree/TreeNode";
import {css} from "@emotion/css";
import {SchemaSelection} from "../../components/SchemaManagement/SchemaSelection";
import {DataPopup} from "../../components/Menu/DataPopup";

const SchemaTreePage = () => {
    const initTreeData = [{
        id: '1',
        name: 'InputRoot',
        children: [],
        path: 'root'
    } as TreeNode];

    const [treeData, setTreeData] = React.useState(initTreeData as TreeNode[]);
    const [schemaData, setSchemaData] = React.useState([] as any[]);

    const [selectedSchema, setSelectedSchema] = React.useState('');
    const [selectedMapping, setSelectedMapping] = React.useState('' as string);

    const [mappingData, setMappingData] = React.useState(new Map<string, Linage>());

    const [files, setFiles] = useState("[{}]");
    const [displayLinage, setDisplayLinage] = useState(false);


    useEffect(() => {
        if (files === '[{}]') {
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
        if (selectedSchema)
            getSchema(selectedSchema).then((res) => {
                const target = JSON.parse(res.schema);
                setSchemaData(target);
            });
    }, [selectedSchema]);

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

    const handleClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        e.currentTarget.value = '';
    }

    const handleUploadJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target);
        if (!e.target || !e.target.files) {
            return false;
        }
        uploadJSONExample(e.target.files[0])
            .then(res => res.json())
            .then(data => {
                setTreeData([fieldResolver(data)]);
                // TODO: check if this is the correct way to clear the file input
                e.target.value = '';
            });
    }
    const handleUploadCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target);
        if (!e.target || !e.target.files) {
            return false;
        }
        uploadCSVFile(e.target.files[0])
            .then(res => res.json())
            .then(data => {
                setTreeData([fieldResolver(data)]);
            });
    }

    const getMappingBlob = () => {
        const processedExportedData = JSON.stringify(mappingData);
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

    const DisplayLinage = useMemo(() => {
        const result = [] as ReactElement[]
        mappingData.forEach((value, key) => {
            if (value)
            result.push(<ListItem>
                <div>{key}</div>
                <div>{stringifyLinage(value)}</div>
            </ListItem>)
        });
        return result;
    }, [mappingData]);

    return (
            <div className={containerStyle}>
                <Paper className={leftContainerStyle}>

                    <div>
                        <h3>Your Data Schema</h3>
                    </div>

                    <SchemaTreeComponent
                        initialTreeData={treeData}
                        fetchData={setTreeData}
                        enableAddField={true}
                    />

                    <div className={originalSchemaGroupStyle}>
                        <FormControl>
                            <Button>
                                <FormControlLabel control={<Input type="file"
                                                                  id='json-sample'
                                                                  name='json-sample'
                                                                  style={{display: 'none'}}
                                                                  onClick={handleClick}
                                                                  onChange={handleUploadJSON}/>} label={'Upload Sample Data (JSON)'}
                                                  htmlFor='json-sample'/>
                            </Button>
                        </FormControl>
                        <FormControl>
                            <Button>
                                <FormControlLabel control={<Input type="file"
                                                                  id='csv-sample'
                                                                  name='csv-sample'
                                                                  style={{display: 'none'}}
                                                                  onClick={handleClick}
                                                                  onChange={handleUploadCSV}/>} label={'Upload Sample Data (CSV)'}
                                                  htmlFor='csv-sample'/>
                            </Button>
                        </FormControl>
                        <FormControl>
                            <Button>
                                <FormControlLabel control={<Input type="file"
                                                                  id='import-schema'
                                                                  name='import-schema'
                                                                  style={{display: 'none'}}
                                                                  onChange={handleChange}/>} label={'Import Schema'}
                                                  htmlFor='import-schema'/>
                            </Button>
                        </FormControl>
                        <FormControl>
                            <Button onClick={getOriginalSchemaBlob}>Export Schema</Button>
                        </FormControl>
                    </div>

                </Paper>

                <Paper className={rightContainerStyle}>

                    <div>
                        <h3>Target Schema Mapping</h3>
                    </div>

                    <SchemaSelection setSelectedSchema={setSelectedSchema}
                                     setSelectedMapping={setSelectedMapping}
                                    setMappingData={setMappingData}
                        selectedMapping={selectedMapping}
                    />

                    <div className={schemaMappingStyle}>
                        <SchemaTreeComponent
                            initialTreeData={schemaData}
                            linkedTreeData={treeData}
                            enableAddField={false}
                            enableLinkField={true}
                            linageMap={mappingData}
                            exportData={setMappingData}
                        />
                    </div>

                    <DataPopup
                    data={DisplayLinage}
                    open={displayLinage}
                    setOpen={setDisplayLinage}/>

                    <div className="button-group">
                        <Button onClick={() => setDisplayLinage(true)}>Show Rule Information</Button>
                        <Button onClick={() => {
                            setMappingData(new Map<string, Linage>());
                            setSelectedMapping('');
                        }}>Clear Mapping</Button>
                        <Button onClick={getMappingBlob}>Export Mapping</Button>
                        <Button onClick={() => {
                            console.log("Entries", Object.fromEntries(mappingData));
                            const tempMap = new Map<string, any>();
                            mappingData.forEach((value, key) => {
                                tempMap.set(key, {
                                    ...value,
                                    variables: Object.fromEntries(value.variables?.entries() ?? [])
                                });
                            });
                            if (selectedMapping === '') {
                                uploadMapping(selectedSchema, Object.fromEntries(tempMap)).then(r => console.log(r));
                            } else {
                                updateMapping(selectedMapping, Object.fromEntries(tempMap)).then(r => console.log(r));
                            }
                        }}>Save Mapping</Button>
                    </div>
                </Paper>
            </div>
            );
}

const originalSchemaGroupStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  justify-items: center;
  min-height: 50px;
  
  button {
    justify-items: center;
    min-height: 40px;
    
    label {
      margin: 0;
      
      span {
        font-size: inherit;
        line-height: inherit;
        letter-spacing: inherit;
      }
    }
  }
`;

const containerStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`

const leftContainerStyle = css`
  display: flex;
  flex-direction: column;
  width: calc(40% - 24px);
`

const rightContainerStyle = css`
  display: flex;
  flex-direction: column;
  width: 60%;
`;

const schemaMappingStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 10px 0 10px;
`


export default SchemaTreePage;