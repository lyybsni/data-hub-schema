import {Button, FormControl, InputLabel, List, ListItem, Menu, MenuItem, Paper, TextField} from "@mui/material"
import {css} from "@emotion/css";
import React, {ChangeEvent} from "react";
import {PopOver} from "../../components/Menu/PopOverText";
import {HelpOutlineRounded} from "@mui/icons-material";
import {Hint} from "./Hint";

export const MappingExample = () => {

    const [shrink, setShrink] = React.useState(false);
    const [rawData, setRawData] = React.useState('');

    const handleRawDataInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (e.target.value) {
            setShrink(true);
            setRawData(e.target.value);
        } else {
            setShrink(false);
        }
    }

    return (
        <div className={mappingExampleStyle}>
            <Paper className={exampleDataAreaStyle}>
                <div>
                    <h3>Example Data</h3>
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
                </div>
                <div>
                    <h3>Visualization</h3>
                </div>
            </Paper>
            <Paper className={operationAreaStyle}>
                <div>
                    <PopOver baseText={<HelpOutlineRounded/>} popoverText={<Hint/>}/>
                    <h3>Operations</h3>
                </div>
                <List>
                    <ListItem><Button>Data Visualization</Button></ListItem>
                    <ListItem><Button>Upload File</Button></ListItem>
                </List>
            </Paper>
            <Paper className={resultDataAreaStyle}>
                <div><h3>View</h3></div>
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