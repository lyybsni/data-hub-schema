import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import React, {useEffect} from "react";
import {css} from "@emotion/css";
import {getMapping, getMappingUnder, getSchemaList} from "../../pages/shared/Schema";

export const SchemaSelection = (
    props: {
        setSelectedSchema: (schema: string) => void,
        setSelectedMapping: (mapping: string) => void,
        setMappingData: (mapping: Map<string, string>) => void,

        style?: any
    }
) => {

    const [schemaList, setSchemaList] = React.useState([] as any[]);
    const [mappingList, setMappingList] = React.useState([] as any[]);

    const [selectedSchema, setSelectedSchema] = React.useState('');
    const [selectedMapping, setSelectedMapping] = React.useState('');

    useEffect(() => {
        // load the data from back end
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
                props.setMappingData(data);
            }
        )
    }, [props, selectedMapping]);

    return (<div className={props.style ?? schemaSelectionStyle}>
        <FormControl className="schema-selection">
            <InputLabel htmlFor='schema'>Current Schema</InputLabel>
            <Select id="schema"
                    label="Current Schema"
                    value={selectedSchema}
                    onChange={(e) => {
                        setSelectedSchema(e.target.value as string);
                        props.setSelectedSchema(e.target.value as string);
                    }}>{schemaList}</Select>
        </FormControl>
        <FormControl className="schema-selection">
            <InputLabel htmlFor='mapping'>Current Mapping</InputLabel>
            <Select id="mapping"
                    label="Current Mapping"
                    value={selectedMapping}
                    onChange={(e) => {
                        const mappingId = e.target.value as string;
                        setSelectedMapping(mappingId);
                        props.setSelectedMapping(mappingId);
                    }}>{mappingList}</Select>
        </FormControl>
    </div>);
}

const schemaSelectionStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: 10px 0 10px;
  
  .schema-selection {
    width: 45%;
  }
`;
