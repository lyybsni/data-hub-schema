import { Button, FormControl, MenuItem, Modal, Select, TextField } from "@mui/material";
import React, { ChangeEvent, useMemo, useState } from "react";
import SchemaTreeComponent from "../SchemaTree";
import { Linage, TreeNode } from "../TreeNode";
import { modalStyle } from "../../shared/ModalStyle";
import { css } from "@emotion/css";

const LinkFieldModal = (props: {
    open: boolean,
    handleClose: () => void,
    treeData: TreeNode[],       // input schema for linkage
    onSubmit?: (linkInfo: Linage) => void,
    input?: boolean
}) => {

    const [selectedKey, setSelectedKey] = React.useState('inherit' as string);
    const [selection, setSelection] = React.useState('inherit' as string);
    const [allowTreeRender, setAllowTreeRender] = React.useState(false);

    const rootMap = useMemo(() => {
        return new Map<string, string>();
    }, []);

    const Panel = (props: {
        labelText: string,
        value?: string,

        onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void,
        mapKey?: string,
        input?: boolean
    }) => {

        const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
            rootMap.set(props.mapKey as string, e.target.value);
            setValue(e.target.value);
            props.onChange?.(e);
        }

        const getValue = () => {
            if (props.mapKey) {
                return rootMap.get(props.mapKey);
            } else {
                return props.value;
            }
        }

        const [value, setValue] = React.useState(getValue() ?? '');

        return <FormControl className='field' onSelect={() => {
            if (props.mapKey && (!props.input)) handleSelection(props.mapKey);
        }
        }>
            <label>{props.labelText}</label>
            <TextField fullWidth value={value} onChange={handleChange} />
        </FormControl>
    }

    const InheritPanel = () => {
        return (<div>
            <Panel labelText={'Direct Inherit'} mapKey='inherit' />
        </div>)
    }

    const ExpressionPanel = () => {
        const [expression, setExpression] = useState(rootMap.get('expression') ?? '');

        const match = Array.from(expression.matchAll(/(?<=\${)\d+(?=})/g));
        const expressionList = useMemo(() => match.map(m => {
            return <Panel key={m.toString()} labelText={m.toString()} mapKey={m.toString()} />
        }), [expression]);

        return <div>
            <FormControl className='field' >
                <label>Expression</label>
                <TextField fullWidth value={expression} onChange={e => {
                    setExpression(e.target.value);
                    rootMap.set('expression', e.target.value);
                }} />
            </FormControl>
            {expressionList}
        </div>
    }

    const RegexPanel = () => {
        return <div>
            <Panel labelText={'Field'} mapKey={'regex'} />
            <Panel labelText={'From Regex'} mapKey={'fromRegex'} input={true} />
            <Panel labelText={'To Regex'} mapKey={'toRegex'} input={true} />
        </div>
    }

    const handleSelection = (key: string) => {
        if (key) {
            setAllowTreeRender(true);
            setSelectedKey(key);
        }
    }

    const handleSelectPath = (path: string) => {
        setAllowTreeRender(false);
        rootMap.set(selectedKey, path);
    }

    const showingPanelMap = new Map<string, React.ReactNode>([
        ['inherit', <InheritPanel />],
        ['expression', <ExpressionPanel />],
        ['regex', <RegexPanel />
        ],
    ]);

    const container = <div className={modalStyle}>
        <div>
            <h3>Link Field</h3>
        </div>
        <div className={mainPanelStyle}>
            <div className={selectionPanelStyle}>
                <FormControl className='field'>
                    <label>Link Type</label>
                    <Select
                        onChange={e => setSelection(e.target.value as string)}
                        fullWidth
                        defaultValue='inherit'
                    >
                        <MenuItem value='inherit'>Direct Inherit</MenuItem>
                        <MenuItem value='expression'>Expression</MenuItem>
                        <MenuItem value='regex'>Regex</MenuItem>
                        <MenuItem value='enum'>Enumeration Mapping</MenuItem>
                        <MenuItem value='array'>Array Aggregation (Only for Leaves)</MenuItem>
                    </Select>
                </FormControl>

                {showingPanelMap.get(selection)}
            </div>

            <div>
                <SchemaTreeComponent
                    initialTreeData={props.treeData}
                    setSelectedPath={handleSelectPath}
                    disabled={!allowTreeRender}
                />
            </div>
        </div>
        <Button onClick={() => {
            const variables = new Map<string, string>();
            const excludes = ['inherit', 'field', 'regex', 'fromRegex', 'toRegex', 'expression'];
            rootMap.forEach((value, key) => {
                if (!excludes.includes(key)) {
                    variables.set(`\${${key}}`, value);
                }
            });
            console.log(variables);

            props.onSubmit?.({
                type: selection,
                expression: rootMap.get('expression'),
                inherit: rootMap.get('inherit'),
                transform: rootMap.get('regex'),    // TODO: change name
                fromRegex: rootMap.get('fromRegex'),
                toRegex: rootMap.get('toRegex'),
                variables: variables,
            } as Linage);

            handleClose();
        }}>Link</Button>
    </div>;

    const handleClose = () => {
        rootMap.clear();
        props.handleClose();
    }

    return (
        <Modal children={container} open={props.open} onClose={handleClose} />
    )
}

const mainPanelStyle = css`
  display: flex;
  flex-direction: row;

  .field {
    width: 90%;
    margin: auto;
  }
`;

const selectionPanelStyle = css`
  width: 50%;
`;

export default LinkFieldModal;
