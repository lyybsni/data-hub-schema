import {
    Button,
    FormControl,
    FormControlLabel,
    Input,
    InputLabel,
    List,
    ListItem,
    Paper,
    Switch,
    TextField
} from "@mui/material"
import {css} from "@emotion/css";
import React, {ChangeEvent} from "react";
import {PopOver} from "../../components/Menu/PopOverText";
import {HelpOutlineRounded} from "@mui/icons-material";
import {Hint} from "./Hint";
import {SchemaSelection} from "../../components/SchemaManagement/SchemaSelection";
import {Linage} from "../../components/SchemaTree/TreeNode";
import {run, trailRun} from "../shared/Convert";
import {DataPopup} from "../../components/Menu/DataPopup";

export const MappingExample = () => {

    const [shrink, setShrink] = React.useState(false);
    const [rawData, setRawData] = React.useState('');
    const [uploadFromFile, setUploadFromFile] = React.useState(false);

    const [selectedSchema, setSelectedSchema] = React.useState('');
    const [selectedMapping, setSelectedMapping] = React.useState('' as string);
    const [mappingData, setMappingData] = React.useState(new Map<string, Linage>());

    const [uploadedFile, setUploadedFile] = React.useState(null as any);
    const [uploadFileName, setUploadFileName] = React.useState('' as string);
    const [onProduction, setOnProduction] = React.useState(false as boolean);

    const [displayData, setDisplayData] = React.useState('');

    const handleRawDataInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (e.target.value) {
            setShrink(true);
            setRawData(e.target.value);
        } else {
            setShrink(false);
            setRawData('');
        }
    }

    const handleSubmit = () => {
        if (onProduction) {
            run(uploadedFile, selectedMapping);
        } else {
            trailRun(rawData, selectedSchema, selectedMapping)
            .then(async r => {
                setDisplayData(JSON.stringify(await r.json(), null, 2));
            });
        }
    }

    const [informationPopupOpen, setInformationPopupOpen] = React.useState(false);
    const [information, setInformation] = React.useState(null as any);

    const handleClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        e.currentTarget.value = '';
    }

    const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target);
        if (!e.target || !e.target.files) {
            return false;
        }
        setUploadFileName(e.target.files[0].name);
        setUploadedFile(e.target.files[0])
    }

    return (
        <div className={mappingExampleStyle}>

            <DataPopup
                open={informationPopupOpen}
                setOpen={setInformationPopupOpen}
                data={
                    <pre className={css`
                      white-space: pre-wrap;
                      word-wrap: normal;
                    `}>
                    {information}
                </pre>
                }/>

            <Paper className={exampleDataAreaStyle}>
                <div>
                    <h3>Example Data</h3>
                    <div className={css`display: flex;
                      flex-direction: row;
                      justify-content: space-evenly`}>
                        <FormControlLabel control={<Switch
                            value={uploadFromFile}
                            onChange={(e, value) => {
                                setUploadFromFile(value);

                                if (!value) setUploadFileName('');
                                else {
                                    setRawData('');
                                    setShrink(false);
                                }
                            }
                            }
                        />} label={'Upload From File?'}/>

                        <div hidden={!uploadFromFile}>
                            <FormControl>
                                <Button>
                                    <FormControlLabel control={<Input type="file"
                                                                      id='data-input'
                                                                      name='data-input'
                                                                      style={{display: 'none'}}
                                                                      onClick={handleClick}
                                                                      onChange={uploadFile}/>} label={'Upload File'}
                                                      htmlFor='data-input'/>
                                </Button>
                            </FormControl>
                        </div>
                    </div>

                    <FormControl className={rawDataStyle}>
                        <InputLabel htmlFor='text-area' shrink={shrink}>
                            Raw Data
                        </InputLabel>
                        <TextField
                            id='text-area'
                            type='text'
                            value={rawData}
                            multiline
                            rows={20}
                            fullWidth
                            onChange={handleRawDataInput}
                            disabled={uploadFromFile}
                        />
                    </FormControl>
                </div>
            </Paper>
            <Paper className={operationAreaStyle}>
                <div className={operationsStyle}>
                    <h3>Operations</h3>
                    <PopOver baseText={<HelpOutlineRounded sx={{height: '16px', width: '16px'}}/>}
                             popoverText={<Hint/>}/>
                </div>
                <FormControlLabel control={
                    <Switch id="on-production"
                            value={onProduction}
                            onChange={(e, checked) => setOnProduction(checked)}/>
                } label={onProduction ? 'Production Mode' : 'Trail Mode'}/>

                <SchemaSelection setSelectedSchema={setSelectedSchema}
                                 setSelectedMapping={setSelectedMapping}
                                 setMappingData={setMappingData}
                                 style={selectionOverrideStyle}
                                 allowCreateMapping={false}
                />
                <List className={css`li {
                  button {
                    margin: auto
                  }
                }`}>
                    {rawData && rawData !== '' ? <ListItem>You will use the raw data.</ListItem> : null}
                    {uploadFileName && uploadFileName !== '' ?
                        <ListItem>You have uploaded: {uploadFileName}</ListItem> : null}
                    <ListItem><Button onClick={handleSubmit}
                                      color={onProduction ? 'warning' : 'primary'}>
                        {onProduction ? 'GO! (On Production)' : 'Try!'}
                    </Button></ListItem>
                    <ListItem><Button disabled={!selectedSchema}
                                      onClick={() => {
                                          setInformationPopupOpen(true);
                                          setInformation(JSON.stringify(selectedSchema));
                                      }}>Check Target Schema</Button></ListItem>
                    <ListItem><Button disabled={!selectedMapping}
                                      onClick={() => {
                                          setInformationPopupOpen(true);
                                          // TODO: toString should be abstracted
                                          setInformation(JSON.stringify(Object.fromEntries(mappingData)));
                                      }}>Check Mapping Rules</Button></ListItem>
                </List>
            </Paper>
            <Paper className={resultDataAreaStyle}>
                <div><h3>View</h3></div>
                <div className={resultDataStyle}>
                    {displayData ?? 'YOUR DATA'}
                </div>
            </Paper>
        </div>
    )
}

const mappingExampleStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const exampleDataAreaStyle = css`
  min-width: 40%;
`;

const operationAreaStyle = css`
  min-width: calc(20% - 12px);
`;

const resultDataAreaStyle = css`
  min-width: 40%;
`;

const rawDataStyle = css`
  width: calc(100% - 12px);
  margin: auto;
`;

const operationsStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .pop-over-base {
    height: 16px;
    width: 16px;

    margin-left: 2px;
  }
`;

const selectionOverrideStyle = css`
  display: flex;
  flex-direction: column;

  .schema-selection {
    margin: 0 10px 5px 10px;
  }
`;

const resultDataStyle = css`
  min-width: 100px;
  min-height: 400px;

  border: 1px solid black;
  margin: 10px 2px 10px;

  display: flex;
  align-items: center;
  justify-content: center;
`