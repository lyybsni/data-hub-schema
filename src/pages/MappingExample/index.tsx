import {
    Button,
    FormControl,
    FormControlLabel,
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
import {trailRun} from "../shared/Convert";
import { DataPopup } from "../../components/Menu/DataPopup";

export const MappingExample = () => {

    const [shrink, setShrink] = React.useState(false);
    const [rawData, setRawData] = React.useState('');
    const [uploadFromFile, setUploadFromFile] = React.useState(false);

    const [selectedSchema, setSelectedSchema] = React.useState('');
    const [selectedMapping, setSelectedMapping] = React.useState('' as string);
    const [mappingData, setMappingData] = React.useState(new Map<string, Linage>());

    const [displayData, setDisplayData] = React.useState('');

    const handleRawDataInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (e.target.value) {
            setShrink(true);
            setRawData(e.target.value);
        } else {
            setShrink(false);
        }
    }

    const handleSubmit = () => {
        trailRun(rawData, selectedSchema, selectedMapping)
            .then(async r => {
                setDisplayData(JSON.stringify(await r.json(), null, 2));
            });
    }

    const [informationPopupOpen, setInformationPopupOpen] = React.useState(false);
    const [information, setInformation] = React.useState('');

    return (
        <div className={mappingExampleStyle}>

            <DataPopup open={informationPopupOpen} setOpen={setInformationPopupOpen} data={information}/>

            <Paper className={exampleDataAreaStyle}>
                <div>
                    <h3>Example Data</h3>
                    <FormControlLabel control={<Switch
                        value={uploadFromFile}
                        onChange={(e) => setUploadFromFile(e.target.checked)}
                    />} label={'Upload From File?'}/>
                    <FormControl>
                        <Button>Upload File</Button>
                    </FormControl>
                    <FormControl className={rawDataStyle}>
                        <InputLabel htmlFor='text-area' shrink={shrink}>
                            Raw Data
                        </InputLabel>
                        <TextField
                            id='text-area'
                            type='text'
                            multiline
                            rows={20}
                            fullWidth
                            onChange={handleRawDataInput}
                        />
                    </FormControl>
                    <div>
                        Your input is received.
                    </div>
                </div>
            </Paper>
            <Paper className={operationAreaStyle}>
                <div className={operationsStyle}>
                    <h3>Operations</h3>
                    <PopOver baseText={<HelpOutlineRounded sx={{height: '16px', width: '16px'}}/>}
                             popoverText={<Hint/>}/>
                </div>
                <SchemaSelection setSelectedSchema={setSelectedSchema}
                                 setSelectedMapping={setSelectedMapping}
                                 setMappingData={setMappingData}
                                 style={selectionOverrideStyle}
                />
                <List className={css`li {
                  button {
                    margin: auto
                  }
                }`}>
                    <ListItem><Button onClick={handleSubmit}>Go!</Button></ListItem>
                    <ListItem><Button onClick={() => {
                        setInformationPopupOpen(true);
                        setInformation(JSON.stringify(selectedSchema));
                    }}>Check Original Schema</Button></ListItem>
                    <ListItem><Button onClick={() => {
                        setInformationPopupOpen(true);
                        setInformation(JSON.stringify(selectedSchema));
                    }}>Check Target Schema</Button></ListItem>
                    <ListItem><Button onClick={() => {
                        setInformationPopupOpen(true);
                        setInformation(JSON.stringify(selectedMapping));
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