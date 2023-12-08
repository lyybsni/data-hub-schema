import SchemaTreeComponent from "../../components/SchemaTree/SchemaTree";
import {ApplicantSchema} from "../../resource/ApplicantSchema";
import React, {useEffect, useState} from "react";
import {Button, FormControl, FormControlLabel, Input, Paper} from "@mui/material";
import {
    fieldResolver,
    jsonToSchemaTree,
    schemaTreeMappingToJson
} from "../../components/SchemaTree/SchemaTreeFormatter";
import {saveFile} from "../../utils/File"
import {updateMapping, uploadCSVFile} from "../shared/Schema";
import {Linage, TreeNode} from "../../components/SchemaTree/TreeNode";
import {css} from "@emotion/css";
import {SchemaSelection} from "../../components/SchemaManagement/SchemaSelection";

const SchemaTreePage = () => {
    const initTreeData = [{
        id: '1',
        name: 'Input Root',
        children: [],
        path: 'root'
    } as TreeNode];

    const [treeData, setTreeData] = React.useState(initTreeData as TreeNode[]);
    const [exportData, setExportData] = React.useState([] as any[]);

    const [selectedSchema, setSelectedSchema] = React.useState('');
    const [selectedMapping, setSelectedMapping] = React.useState('' as string);

    const [mappingData, setMappingData] = React.useState(new Map<string, Linage>());

    const [files, setFiles] = useState("[{}]");


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
                                                                  id='csv-import'
                                                                  name='csv-import'
                                                                  style={{display: 'none'}}
                                                                  onChange={handleChange}/>} label={'Load Schema in JSON'}
                                                  htmlFor='csv-import'/>
                            </Button>
                        </FormControl>
                        <FormControl>
                            <Button>
                                <FormControlLabel control={<Input type="file"
                                                                  id='import-schema'
                                                                  name='import-schema'
                                                                  style={{display: 'none'}}
                                                                  onChange={handleUploadCSV}/>} label={'Upload Sample Data (CSV)'}
                                                  htmlFor='import-schema'/>
                            </Button>
                        </FormControl>
                        <FormControl>
                            <Button onClick={getOriginalSchemaBlob}>Export Schema in JSON</Button>
                        </FormControl>
                    </div>

                </Paper>

                <Paper className={rightContainerStyle}>

                    <div>
                        <h3>Target Schema Mapping</h3>
                    </div>

                    <SchemaSelection setSelectedSchema={setSelectedSchema}
                                     setSelectedMapping={setSelectedMapping}
                                    setMappingData={setMappingData}/>

                    <SchemaTreeComponent
                        initialTreeData={[ApplicantSchema]}
                        linkedTreeData={treeData}
                        enableAddField={false}
                        enableLinkField={true}
                        linageMap={mappingData}
                        exportData={(data) => {
                            setExportData(data);
                            console.log(data);
                        }}
                    />

                    <div className="button-group">
                        <Button onClick={getMappingBlob}>Export Mapping</Button>
                        <Button onClick={() => updateMapping(selectedSchema, JSON.stringify(exportData))}>Save Mapping</Button>
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


export default SchemaTreePage;