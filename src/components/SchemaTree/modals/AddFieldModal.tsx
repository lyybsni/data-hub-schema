import {Button, FormControl, FormControlLabel, MenuItem, Modal, Select, Switch, TextField} from "@mui/material";
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
    initialValues?: BasicNode,

    onAdd: (node: BasicNode) => void,
    onModify?: ((newNode: BasicNode) => void) | undefined
}) => {

    const formik = useFormik(
        {
            initialValues: (props.onModify && props.initialValues) ? {
                ...props.initialValues,
                isArray: props.initialValues.type === 'array'
            } : {
                isPrimary: false,
                isArray: false,
                name: '',
                type: 'Object',
            },
            onSubmit: async (values) => {
                const node = {...values};
                if (!props.onModify) {
                    props.onAdd(node);
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
                    <div className={css`display: flex; flex-wrap: wrap`}>
                    <FormControl className={fieldStyle}>
                        <FormControlLabel control={<Switch
                            id='isArray'
                            name='isArray'
                            checked={formik.values.isArray}
                            onChange={(e) => {
                                formik.handleChange(e);
                                if (e.target.checked) {
                                    formik.setFieldValue('type', 'Array');
                                }
                            }}/>} label={'Is Array?'}/>
                    </FormControl>
                    <FormControl className={fieldStyle}>
                        <FormControlLabel control={<Switch
                            id='isPrimary'
                            name='isPrimary'
                            checked={formik.values.isPrimary}
                            onChange={formik.handleChange}/>} label={'Is Primary?'}/>
                    </FormControl>
                    <FormControl className={fieldStyle}>
                        <TextField type='text'
                                   id='name'
                                   name='name'
                                   value={formik.values.name}
                                   onChange={formik.handleChange}
                                   label='Attribute Name'/>
                    </FormControl>
                    <FormControl className={fieldStyle}>
                        <Select id='type'
                                name='type'
                                label='Attribute Type'
                                onChange={formik.handleChange}
                                value={formik.values.type}
                                disabled={formik.values.isArray}
                        >
                            <MenuItem value='String'>String</MenuItem>
                            <MenuItem value='Enumeration'>Enumeration</MenuItem>
                            <MenuItem value='Number'>Number</MenuItem>
                            <MenuItem value='Boolean'>Boolean</MenuItem>
                            <MenuItem value='Array'>Array</MenuItem>
                            <MenuItem value='Object'>Object</MenuItem>
                        </Select>
                    </FormControl>
                    </div>
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

const fieldStyle = css`
  width: 45%;
  margin: auto;
`

export default AddFieldModal;