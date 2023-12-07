import SchemaTreeComponent from "../../components/SchemaTree/SchemaTree";
import React, {useEffect} from "react";
import {TreeNode} from "../../components/SchemaTree/TreeNode";
import {
    Button,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    MenuList,
    Paper,
    Select, Switch
} from "@mui/material";
import {createSchema, getSchema, getSchemaList, updateSchema} from "../shared/Schema";
import {css} from "@emotion/css";

const CreateSchema = (props: {
    selectedSchema: string,
    setSelectedSchema: (schema: string) => void,
    schemaList?: any[],
    display?: boolean
}) => {
    return (
        <FormControl id='schema-page-selection-group' disabled={!props.display} sx={{display: 'flex'}}>
            <InputLabel htmlFor='schema'>Current Schema</InputLabel>
            <Select id="schema"
                    fullWidth
                    value={props.selectedSchema}
                    onChange={(e) => props.setSelectedSchema(e.target.value as string)}>{props.schemaList}</Select>
        </FormControl>
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
    const [savedSchema, setSavedSchema] = React.useState([] as any[]);

    useEffect(() => {
        getSchemaList().then((res) => {
            return res.map((item) => {
                return (<MenuItem value={item.id} key={item.id}>
                    {item.schema.name ?? item.id}
                </MenuItem>)
            })
        }).then(setSchemaList);
    }, []);

    useEffect(() => {
        if (selectedSchema)
            getSchema(selectedSchema).then((res) => {
                const target = JSON.parse(res.schema);
                setTreeData(target);
                setSavedSchema(target);
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
        <div className={containerStyle}>
            <Paper className={schemaFactoryStyle}>
                <h3>Schema Factory</h3>
                <FormControl className={schemaFilterStyle}>
                    <FormControlLabel control={<Switch id='create-schema'
                                                       value={createSchemaMode}
                                                         onChange={(e) => {
                                                             setCreateSchemaMode(e.target.checked);
                                                             setSelectedSchema('');
                                                             setTreeData(e.target.checked ? initTreeData : []);
                                                         }}/>} label={'Create New Schema'}/>
                </FormControl>
                <CreateSchema
                    display={!createSchemaMode}
                    selectedSchema={selectedSchema}
                    setSelectedSchema={setSelectedSchema}
                    schemaList={schemaList}
                />
            </Paper>

            <Paper className={css`min-width: calc(70% - 300px);`}>
                <h3>Schema Playground</h3>
                {(createSchemaMode || selectedSchema) ?
                    <SchemaTreeComponent
                        initialTreeData={treeData}
                        fetchData={setTreeData}
                        enableAddField={true}
                    />:<span>No schema selected currently.</span>}
            </Paper>

            <Paper className={css`min-width: 280px`}>
                <h3>Functions</h3>
                <MenuList>
                    <MenuItem><Button onClick={() => {
                        if (createSchemaMode) {
                            setTreeData(initTreeData);
                        } else {
                            setTreeData(savedSchema);
                        }
                    }}>Reset Schema</Button></MenuItem>
                    <MenuItem><Button onClick={handleSubmitSchema}>Save Schema</Button></MenuItem>
                    <MenuItem><Button onClick={handleSubmitSchema}>View Information</Button></MenuItem>
                </MenuList>
            </Paper>
        </div>
    )
}

const containerStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const schemaFactoryStyle = css`
  min-width: 30%;
`;

const schemaFilterStyle = css`
    text-align: left;
    padding-left: 30px;
    padding-right: 30px;
`;