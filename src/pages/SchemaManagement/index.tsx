import SchemaTreeComponent, { findPrimary } from "../../components/SchemaTree/SchemaTree";
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
    Select,
    Switch
} from "@mui/material";
import {createSchema, getSchema, getSchemaList, updateSchema} from "../../components/shared/Schema";
import {css} from "@emotion/css";
import {useDispatch} from "react-redux";
import {openAlert} from "../../redux/AlertSlice";
import {errorAlert, successAlert} from "../../utils/Request";
import {TitleWithHint} from "../../components/title/Title";
import {ButtonWithIcon} from "../../components/Menu/ButtonWithIcon";
import {Clear, Save, Search} from "@mui/icons-material";

const CreateSchema = (props: {
    selectedSchema: string,
    setSelectedSchema: (schema: string) => void,
    schemaList?: any[],
    display?: boolean
}) => {
    return (
        <FormControl id='schema-page-selection-group' disabled={!props.display} sx={{display: 'flex'}}>
            <InputLabel>Current Schema</InputLabel>
            <Select fullWidth
                    value={props.selectedSchema}
                    onChange={(e) => props.setSelectedSchema(e.target.value as string)}>{props.schemaList}</Select>
        </FormControl>
    );
};

export const SchemaManagementPage = () => {
    const initTreeData = [{
        id: '1',
        name: 'InputRoot',
        children: [],
        path: 'root'
    } as TreeNode];

    const [treeData, setTreeData] = React.useState([] as TreeNode[]);
    const [selectedSchema, setSelectedSchema] = React.useState('' as string);
    const [createSchemaMode, setCreateSchemaMode] = React.useState(false as boolean);
    const [schemaList, setSchemaList] = React.useState([] as any[]);
    const [savedSchema, setSavedSchema] = React.useState([] as any[]);

    const dispatch = useDispatch();

    useEffect(() => {
        getSchemaList().then((res) => {
            return res.map((item) => {
                return (<MenuItem value={item.id} key={item.id}>
                    {item.schema.name ?? item.id}
                </MenuItem>)
            })
        }).then(setSchemaList)
            .catch(() => {
                dispatch(openAlert(errorAlert("Get schema list failed.")));
            });
    }, [dispatch]);

    useEffect(() => {
        if (selectedSchema)
            getSchema(selectedSchema).then((res) => {
                const target = JSON.parse(res.schema);
                setTreeData(target);
                setSavedSchema(target);
            }).catch(() => {
                dispatch(openAlert(errorAlert("Get schema failed.")));
            });
    }, [dispatch, selectedSchema]);

    const handleSubmitSchema = () => {
        if (findPrimary(treeData).length === 0) {
            // TODO: add a warning panel
            console.info("there is no id");
        }

        if (selectedSchema) {
            updateSchema(selectedSchema, JSON.stringify(treeData))
                .then(() => {
                    dispatch(openAlert(successAlert("Schema updated successfully.")));
                })
        } else {
            createSchema(JSON.stringify(treeData))
                .then(() => {
                    dispatch(openAlert(successAlert("Schema created successfully.")));
                });
        }
    };

    const schemaFactoryHintText = [
        "To create a new schema, click the switch on the left to enter the schema factory mode.",
        "To edit an existing schema, select the schema from the dropdown menu on the left."
    ];

    const schemaPlaygroundHintText = [
        "For existing fields, you can add a subfield, modify the field, and delete the field with all subfields.",
        "Please be noted that you should click the 'Save Schema' button to save your changes.",
        "You can not delete the root node."
        ];

    return (
        <div className={containerStyle}>
            <Paper className={schemaFactoryStyle}>
                <TitleWithHint title={"Schema Factory"} article={schemaFactoryHintText}/>
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

            <Paper className={css`min-width: calc(70% - 180px);`}>
                <TitleWithHint title={"Schema Playground"} article={schemaPlaygroundHintText}/>
                {(createSchemaMode || selectedSchema) ?
                    <SchemaTreeComponent
                        initialTreeData={treeData}
                        fetchData={setTreeData}
                        enableAddField={true}
                    /> : <span>No schema selected currently.</span>}
            </Paper>

            <Paper className={css`min-width: 160px`}>
                <h3>Functions</h3>
                <MenuList>
                    <MenuItem><Button onClick={() => {
                        if (createSchemaMode) {
                            setTreeData(initTreeData);
                        } else {
                            setTreeData(savedSchema);
                        }
                    }}><ButtonWithIcon icon={<Clear/>} text={"Clear"}/></Button></MenuItem>
                    <MenuItem><Button onClick={handleSubmitSchema}>
                        <ButtonWithIcon icon={<Save/>} text={"Save"}/></Button></MenuItem>
                    <MenuItem><Button onClick={handleSubmitSchema}><ButtonWithIcon icon={<Search/>} text={"View"}/></Button></MenuItem>
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