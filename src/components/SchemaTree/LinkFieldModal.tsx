import {Button, Modal} from "@mui/material";
import React from "react";
import SchemaTreeComponent from "./SchemaTree";
import {TreeNode} from "./TreeNode";

const LinkFieldModal = (props: {
    open: boolean,
    handleClose: () => void,

    treeData: TreeNode[],       // input schema for linkage
    onConfirm: (nodeId: string) => string,      // add the link
    schemaNode: string,         // nodeId of the node to be modified
    modifySchemaNodePath: (nodeId: string, path: string) => void,
}) => {

    // const [linkedSchemaNode, setLinkedSchemaNode] = React.useState('');
    const [selectedPath, setSelectedPath] = React.useState('' as string);

    const container = <div className='modal-container'>
        <SchemaTreeComponent
            initialTreeData={props.treeData}
            enableAddField={false}
            // setSelectedNode={setLinkedSchemaNode}
            setSelectedPath={setSelectedPath}
            />
        <Button onClick={() => {
            props.modifySchemaNodePath(props.schemaNode, selectedPath);
            handleClose();
        }}>Link</Button>
    </div>;

    const handleClose = () => {
        props.handleClose();
    }

    return (
        <Modal children={container} open={props.open} onClose={handleClose}/>
    )
}

export default LinkFieldModal;
