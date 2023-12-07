import React, {ReactElement} from "react";
import {Popover, Typography} from "@mui/material";

export const PopOver = (
    props: {
        baseText?: string | ReactElement,
        popoverText?: string | ReactElement,
    }
) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLSpanElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLSpanElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div className='pop-over-base'>
            <span aria-describedby={id} onClick={handleClick}>
            {props.baseText}
        </span>

            <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
        >
            <Typography sx={{p: 2}}>{props.popoverText}</Typography>
        </Popover>
        </div>
)
}