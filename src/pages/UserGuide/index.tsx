import {List, ListItem, Paper} from "@mui/material";
import {css} from "@emotion/css";
import React from "react";
import {schemaManagementGuide} from "../../resource/guide/SchemaManagementGuide";
import {schemaMappingGuide} from "../../resource/guide/SchemaMappingGuide";
import {mappingTrialExampleGuide} from "../../resource/guide/MappingTrialExampleGuide";
import {logAndHistoryGuide} from "../../resource/guide/LogAndHistoryGuide";
import {userManagementGuide} from "../../resource/guide/UserManagementGuide";
import {apiCallGuide} from "../../resource/guide/APICallGuide";

export const UserGuide = () => {

    const [selected, setSelected] = React.useState(0);

    const articleTitle = [
        "Schema Management",
        "Schema Mapping",
        "Mapping Trials",
        "Logs and Histories",
        "Account Management",
    ]

    const articleContent = [
        schemaManagementGuide(),
        schemaMappingGuide(),
        mappingTrialExampleGuide(),
        logAndHistoryGuide(),
        userManagementGuide(),
    ]

    const menu = <List>
        <ListItem><b>Website</b></ListItem>
        {articleTitle.map((title, index) => {
            return <ListItem key={index}
                className={selected === index ? selectedItemStyle : ''}
                onClick={() => setSelected(index)}>{title}
            </ListItem>
        })}
        <ListItem><b>Developer</b></ListItem>
        <ListItem className={selected === 6 ? selectedItemStyle: ''} onClick={() => setSelected(6)}>APIs</ListItem>
    </List>;

    return <div className={userGuideContainerStyle}>
        <Paper className={css`width: calc(18% - 12px)`}>
            {menu}
        </Paper>
        <Paper className={css`width: 82%;`}>
            <div className={articleStyle}>
                {selected < 6 ? articleContent[selected] : apiCallGuide()}
            </div>
        </Paper>
    </div>
}

const userGuideContainerStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const selectedItemStyle = css`
  background: beige;
  color: brown;
  font-weight: bold;
`;

const articleStyle = css`
  text-align: left;
  padding-left: 12px;
  padding-right: 12px;
  
  max-height: calc(100vh - 120px);
  overflow-y: auto;
  
  p {
    padding-left: 10px;
  }
  
  span {
    font-family: Consolas, monospace;
    background: honeydew;
  }
  
  ul {
    li {
      line-height: 24px;
    }
  }
  
  table {
    border-collapse: collapse;
    border-top: 2px solid #ccc;
    border-bottom: 2px solid #ccc;
    width: calc(100% - 40px);
    margin: auto;
    
    thead {
      border-bottom: 2px solid #ccc;
    }
    
    tr {
      line-height: 24px;
    }
    
    th {
      vertical-align: top;
    }
    
    ul {
      margin: 0;
      padding: 0;
    }
  }
`;