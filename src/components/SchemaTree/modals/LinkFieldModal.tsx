import {Button, FormControl, MenuItem, Modal, Select, TextField} from "@mui/material";
import React, {ChangeEvent, useMemo} from "react";
import SchemaTreeComponent from "../SchemaTree";
import {TreeNode} from "../TreeNode";
import {modalStyle} from "../../shared/ModalStyle";
import {css} from "@emotion/css";

const LinkFieldModal = (props: {
    open: boolean,
    handleClose: () => void,

    treeData: TreeNode[],       // input schema for linkage
    onConfirm: (nodeId: string) => string | null,      // add the link
    schemaNode: string,         // nodeId of the node to be modified
    modifySchemaNodePath: (nodeId: string, path: string) => void,
}) => {

    const [selectedPath, setSelectedPath] = React.useState('' as string);
    const [selectedKey, setSelectedKey] = React.useState('inherit' as string);
    const [selection, setSelection] = React.useState('inherit' as string);
    const [allowTreeRender, setAllowTreeRender] = React.useState(false);

    const rootMap = useMemo(() => {
        return new Map<string, string>();
    }, []);

    const Panel = (props: {
        labelText: string,
        value?: string,
        beforeSelection?: () => void,
        onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void,
        mapKey?: string,
    }) => {
        return <FormControl className='field' onSelect={() => {
            props.beforeSelection?.();
            handleSelection(props.mapKey ?? '');
        }
        }>
            <label>{props.labelText}</label>
            <TextField fullWidth value={props.mapKey ? rootMap.get(props.mapKey) : props.value} onChange={props.onChange}/>
        </FormControl>
    }


    const InheritPanel = () => {
        return (<div>
            <Panel labelText={'Direct Inherit'} mapKey='inherit'/>
        </div>)
    }

    const ExpressionPanel = (
        props: {
            expression: string,
            setExpression:(str: string) => void,
        }
    ) => {
        const [expression, setExpression] = React.useState(props.expression);

        const expressionList = useMemo(() => {
            const match = Array.from(expression.matchAll(/(?<=\${)\d+(?=})/g));
            return match.map(m => {
                return <Panel labelText={m.toString()} mapKey={m.toString()} beforeSelection={() => props.setExpression(expression)}/>
            });
        }, [expression, props]);

        const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
            setExpression(e.target.value);
        }

        return <div>
            <Panel labelText={'Expression'} value={expression} onChange={handleChange}/>
            {expressionList}
        </div>
    }

    const RegexPanel = () => {
        return <div>
            <Panel labelText={'Field'} mapKey={'field'}/>
            <Panel labelText={'From Regex'}/>
            <Panel labelText={'To Regex'}/>
        </div>
    }

    const handleSelection = (key: string) => {
        if (key) {
            setAllowTreeRender(true);
            setSelectedKey(key);
        }
    }

    const handleSelectPath = (path: string) => {
        setSelectedPath(path);
        setAllowTreeRender(false);
        rootMap.set(selectedKey, path);
    }

    const [expression, setExpression] = React.useState('');

    const showingPanelMap = new Map<string, React.ReactNode>([
        ['inherit', <InheritPanel/>],
        ['expression', <ExpressionPanel expression={expression} setExpression={setExpression}/>],
        ['regex', <RegexPanel/>],
    ]);

    const container = <div className={modalStyle}>
        <div className={mainPanelStyle}>
        <div className={selectionPanelStyle}>
        <FormControl className='field'>
            <label>Link Type</label>
            <Select
                onChange={e => setSelection(e.target.value as string)}
                fullWidth
            >
                <MenuItem value='inherit'>Direct Inherit</MenuItem>
                <MenuItem value='expression'>Expression</MenuItem>
                <MenuItem value='regex'>Regex</MenuItem>
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
            props.modifySchemaNodePath(props.schemaNode, selectedPath); // TODO: change this
            handleClose();
        }}>Link</Button>
    </div>;

    const handleClose = () => {
        setExpression('');
        rootMap.clear();
        props.handleClose();
    }

    return (
        <Modal children={container} open={props.open} onClose={handleClose}/>
    )
}

const mainPanelStyle = css`
  display: flex;
    flex-direction: row;
  
  .field {
    width:90%;
    margin: auto;
  }
`;

const selectionPanelStyle = css`
    width: 50%;
`;

export default LinkFieldModal;
