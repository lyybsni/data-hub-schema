import {Button, Dialog} from "@mui/material"
import {ReactElement} from "react";
import {css} from "@emotion/css";

export const DataPopup = (props: {
    data: ReactElement | ReactElement[] | string,
    open?: boolean,
    setOpen?: (open: boolean) => void,
}) => {

    return (
        <Dialog open={props.open ?? false} onClose={() => props.setOpen?.(false)} className={dialogStyle}>
            <div>
                {props.data}
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
            <div>
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

const dialogStyle = css`
  min-width: 50%;
  min-height: 50%;
  margin: auto ;
`;