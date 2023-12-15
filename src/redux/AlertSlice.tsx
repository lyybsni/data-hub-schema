import {createSlice} from "@reduxjs/toolkit";

export const alertSlice = createSlice({
    name: 'alert',
    initialState: {
        open: false,
        message: '',
        severity: 'success'
    },
    reducers: {
        openAlert: (state, action) => {
            state.open = true;
            state.message = action.payload.message;
            state.severity = action.payload.severity;
        },
        closeAlert: (state) => {
            state.open = false;
        }
    }
});

export const {openAlert, closeAlert} = alertSlice.actions;