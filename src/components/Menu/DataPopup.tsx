import {Button, Dialog} from "@mui/material"
import {ReactElement} from "react";

export const DataPopup = (props: {
    data: ReactElement | ReactElement[] | string,
    open?: boolean,
    setOpen?: (open: boolean) => void,
}) => {

    return (
        <Dialog open={props.open ?? false} onClose={() => props.setOpen?.(false)}>
            <div className='data-popup'>
                <pre>
                    {props.data}
                </pre>
            </div>
        </Dialog>
    )

}

export const ConfirmDataPopup = (props: {
    data: ReactElement | ReactElement[] | string,
    open?: boolean,
    setOpen?: (open: boolean) => void,
    onDelete?: () => void
}) => {

    return (
        <Dialog open={props.open ?? false} onClose={() => props.setOpen?.(false)}>
            <div className='data-popup'>
                <span>
                    {props.data}
                </span>
                <Button onClick={() => {
                    props.onDelete?.();
                    props.setOpen?.(false);
                }}>Confirm</Button>
                <Button onClick={() => props.setOpen?.(false)}
                >Cancel</Button>
            </div>
        </Dialog>
    )
}