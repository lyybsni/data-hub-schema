import {Button, FormControl, FormControlLabel, Modal, Switch, TextField} from "@mui/material";
import React from "react";

import '../../../pages/Mapping/SchemaTree.css';
import {Form, FormikProvider, useFormik} from "formik";
import {BasicNode} from "../TreeNode";
import {modalStyle} from "../../shared/ModalStyle";
import {css} from "@emotion/css";
import {ConfirmDataPopup} from "../../Menu/DataPopup";

const AddFieldModal = (props: {
    open: boolean,
    handleClose: () => void,
    onAdd: (node: BasicNode) => void,

    initialValues?: BasicNode,
    onModify?: ((newNode: BasicNode) => void) | undefined
}) => {

    const formik = useFormik(
        {
            initialValues: (props.onModify && props.initialValues) ? {
                ...props.initialValues,
                isArray: props.initialValues.type === 'array'
            } : {
                isArray: false,
                name: '',
                type: ''
            },
            onSubmit: async (values) => {
                const node = {...values};
                if (!props.onModify) {
                    props.onAdd( node);
                } else {
                    // TODO: not working
                    setData("Are you sure to modify this node?");
                    setConfirmOpen(true);
                    setOnConfirm(() => {
                        props.onModify?.(node)
                    });
                }
                formik.resetForm();
            },
            enableReinitialize: true
        }
    );

    const [confirmOpen, setConfirmOpen] = React.useState(false);
    const [data, setData] = React.useState('');
    const [onConfirm, setOnConfirm] = React.useState<(() => void) | undefined>(undefined);

    const container =
        <div className={modalStyle}>
            <h3>Add a Field</h3>
            <ConfirmDataPopup open={confirmOpen} setOpen={setConfirmOpen} data={data} onDelete={() => {
                onConfirm?.();
            }}/>
        <FormikProvider value={formik}>
            <Form onSubmit={formik.handleSubmit} className={modalFieldStyle}>
                <FormControl>
                    <FormControlLabel control={<Switch
                        id='isArray'
                        name='isArray'
                        checked={formik.values.isArray}
                        onChange={formik.handleChange}/>} label={'Is Array?'}/>
                </FormControl>
                <TextField type='text'
                           id='name'
                           name='name'
                           value={formik.values.name}
                           onChange={formik.handleChange}
                           label='Attribute Name'/>
                <TextField type='text'
                           id='type'
                           name='type'
                           value={formik.values.type}
                           disabled={formik.values.isArray}
                           onChange={formik.handleChange}
                           label='Attribute Type'/>
                <Button type='submit' fullWidth>
                    Submit
                </Button>
            </Form>
        </FormikProvider>
    </div>;

    const handleClose = () => {
        props.handleClose();
    }

    console.log(props);

    return (
        <Modal children={container} open={props.open} onClose={handleClose}/>
    )

}

const modalFieldStyle = css`
  display: flex;
  flex-direction: column;
  
  div {
    margin: 2px;
  }
`;

export default AddFieldModal;