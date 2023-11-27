import {Button, Input, Modal} from "@mui/material";
import React from "react";

import './SchemaTree.css';

const AddFieldModal = (props: {
    open: boolean,
    handleClose: () => void,
    handleAddField: (name: string, type: string) => void
}) => {

    const [name, setName] = React.useState('');
    const [type, setType] = React.useState('');

    const container = <div className='modal-container'>
        <div className='modal-input-group'>
            <span>Attribute Name</span>
            <Input type="text" onChange={e => setName(e.target.value)}></Input>
        </div>
        <div className='modal-input-group'>
            <span>Attribute Type</span>
            <Input type="text" onChange={e => setType(e.target.value)}></Input>
        </div>
        <Button onClick={() => {
            props.handleAddField(name, type);
            handleClose();
        }}>Submit</Button>
    </div>;

    const handleClose = () => {
        props.handleClose();
    }

    return (
        <Modal children={container} open={props.open} onClose={handleClose}/>
    )

}

export default AddFieldModal;