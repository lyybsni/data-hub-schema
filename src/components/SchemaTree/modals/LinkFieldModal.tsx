import {Button, FormControl, MenuItem, Modal, Select, TextField} from "@mui/material";
import React, {ChangeEvent, useMemo} from "react";
import SchemaTreeComponent from "../SchemaTree";
import {Linage, TreeNode} from "../TreeNode";
import {modalStyle} from "../../shared/ModalStyle";
import {css} from "@emotion/css";

const LinkFieldModal = (props: {
    open: boolean,
    handleClose: () => void,
    treeData: TreeNode[],       // input schema for linkage
    onSubmit?: (linkInfo: Linage) => void,
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

    const RegexPanel = (
        props: {
            fromRegex: string,
            toRegex: string,
            handleFromRegexChange: (str: string) => void,
            handleToRegexChange: (str: string) => void,
        }
    ) => {
        return <div>
            <Panel labelText={'Field'} mapKey={'field'}/>
            <Panel labelText={'From Regex'} onChange={(e) => props.handleFromRegexChange(e.target.value)} value={fromRegex}/>
            <Panel labelText={'To Regex'} onChange={(e) => props.handleToRegexChange(e.target.value)} value={toRegex}/>
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

    const [expression, setExpression] = React.useState('');
    const [fromRegex, setFromRegex] = React.useState('');
    const [toRegex, setToRegex] = React.useState('');

    const showingPanelMap = new Map<string, React.ReactNode>([
        ['inherit', <InheritPanel/>],
        ['expression', <ExpressionPanel expression={expression} setExpression={setExpression}/>],
        ['regex', <RegexPanel handleFromRegexChange={setFromRegex}
                              handleToRegexChange={setToRegex}
        fromRegex={fromRegex} toRegex={toRegex}/>
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
            const variables = new Map<string, string>();
            const excludes = ['inherit', 'field'];
            rootMap.forEach((value, key) => {
                if (!excludes.includes(key)) {
                    variables.set(`\${${key}}`, value);
                }
            });

            props.onSubmit?.({
                type: selection,
                expression: expression,

                inherit: rootMap.get('inherit'),
                transform: rootMap.get('field'),    // TODO: change name
                fromRegex: fromRegex,
                toRegex: toRegex,
                variables: variables,
            });

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
