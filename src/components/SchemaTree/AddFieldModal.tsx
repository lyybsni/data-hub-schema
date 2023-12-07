import {Button, FormControl, FormControlLabel, Modal, Switch, TextField} from "@mui/material";
import React from "react";

import '../../pages/SchemaTree/SchemaTree.css';
import {Form, FormikProvider, useFormik} from "formik";
import {BasicNode} from "./TreeNode";
import {modalStyle} from "../shared/ModalStyle";

const AddFieldModal = (props: {
    open: boolean,
    handleClose: () => void,
    handleAddField: (node: BasicNode) => void
}) => {
    const formik = useFormik(
        {
            initialValues: {
                isArray: false,
                name: '',
                type: ''
            },
            onSubmit: async (values) => {
                props.handleAddField( {
                    name: values.name,
                    type: values.type,
                    isArray: values.isArray,
                } as BasicNode);
                formik.resetForm();
            }
        }
    );

    const container = <div className={modalStyle}>
        <FormikProvider value={formik}>
            <Form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormControlLabel control={<Switch
                        id='isArray'
                        name='isArray'
                        checked={formik.values.isArray}
                        onChange={formik.handleChange}/>} label={'Is Array?'}/>
                </FormControl>
                <TextField fullWidth type='text'
                           id='name'
                           name='name'
                           value={formik.values.name}
                           onChange={formik.handleChange}
                           label='Attribute Name'/>
                <TextField fullWidth type='text'
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

    return (
        <Modal children={container} open={props.open} onClose={handleClose}/>
    )

}

export default AddFieldModal;