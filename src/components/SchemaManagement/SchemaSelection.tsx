import {FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch} from "@mui/material";
import React, {useEffect} from "react";
import {css} from "@emotion/css";
import {getMapping, getMappingUnder, getSchemaList} from "../../pages/shared/Schema";
import {Linage} from "../SchemaTree/TreeNode";

export const SchemaSelection = (
    props: {
        setSelectedSchema: (schema: string) => void,
        setSelectedMapping: (mapping: string) => void,
        setMappingData: (mapping: Map<string, Linage>) => void,
        selectedMapping?: string,
        allowCreateMapping?: boolean,
        style?: any
    }
) => {

    const [schemaList, setSchemaList] = React.useState([] as any[]);
    const [mappingList, setMappingList] = React.useState([] as any[]);

    const [selectedSchema, setSelectedSchema] = React.useState('');
    const [selectedMapping, setSelectedMapping] = React.useState(props.selectedMapping ?? '');

    const [createMapping, setCreateMapping] = React.useState(false as boolean);

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
        setSelectedMapping(props.selectedMapping ?? '');
    }, [props.selectedMapping]);

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
                const data = new Map<string, Linage>();
                result.mapping.forEach((item: any) => {
                    const temp = new Map<string, string>();
                    if (item.variables) Object.keys(item.variables).forEach((v: string) => {
                        temp.set(v, item.variables[v]);
                    });
                    data.set(item.path, {
                        ...item,
                        variables: temp,
                    });
                    console.log(item)
                });
                props.setMappingData(data);
            }
        )
    }, [selectedMapping]);

    return (<div>
        <div hidden={!(props.allowCreateMapping ?? true)}>
            <FormControlLabel control={
                <Switch id="create-mapping" value={createMapping} onChange={(e, checked) => setCreateMapping(checked)}/>
            } label={"Create Mapping?"} disabled={!!selectedMapping}/>
        </div>
        <div className={props.style ?? schemaSelectionStyle}>
            <FormControl className="schema-selection">
                <InputLabel htmlFor='schema'>Current Schema</InputLabel>
                <Select id="schema"
                        label="Current Schema"
                        value={selectedSchema}
                        onChange={(e) => {
                            setSelectedSchema(e.target.value as string);
                            // setSelectedMapping('');
                            props.setSelectedSchema(e.target.value as string);
                            props.setSelectedMapping('');
                        }}>{schemaList}</Select>
            </FormControl>
            <FormControl className="schema-selection" disabled={createMapping || selectedSchema === ''}>
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
        </div>
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
