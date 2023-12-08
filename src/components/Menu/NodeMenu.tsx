import * as React from 'react';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import {Edit} from "@mui/icons-material";

export default function MenuListComposition(
    props: {
        enabled?: string[]
        onAdd?: () => void,
        onModify?: () => void,
        onDelete?: () => void,
        onLink?: () => void,
    }
) {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: Event | React.SyntheticEvent) => {
        if (
            anchorRef.current &&
            anchorRef.current.contains(event.target as HTMLElement)
        ) {
            return;
        }

        setOpen(false);
    };

    const handleAdd = (event: Event | React.SyntheticEvent) => {
        props.onAdd?.();
        handleClose(event);
    }

    const handleModify = (event: Event | React.SyntheticEvent) => {
        props.onModify?.();
        handleClose(event);
    }

    const handleDelete = (event: Event | React.SyntheticEvent) => {
        props.onDelete?.();
        handleClose(event);
    }

    const handleLink = (event: Event | React.SyntheticEvent) => {
        props.onLink?.();
        handleClose(event);
    }

    function handleListKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current && !open) {
            anchorRef.current!.focus();
        }

        prevOpen.current = open;
    }, [open]);

    const getItemList = () => {
        const itemList = [] as JSX.Element[];
        props.enabled?.forEach((item) => {
            if (item === 'add') {
                itemList.push(<MenuItem key={item} onClick={handleAdd}>Add</MenuItem>);
            } else if (item === 'modify') {
                itemList.push(<MenuItem key={item} onClick={handleModify}>Modify</MenuItem>);
            } else if (item === 'delete') {
                itemList.push(<MenuItem key={item} onClick={handleDelete}>Delete</MenuItem>);
            } else if (item === 'link') {
                itemList.push(<MenuItem key={item} onClick={handleLink}>Link</MenuItem>);
            }
        });
        return itemList;
    }

    return (
        // <Stack direction="row" spacing={2}>
            <div className="node-modification" >
                <Button
                    ref={anchorRef}
                    id="composition-button"
                    sx={{padding: 0, minWidth: '16px', minHeight: '16px'}}
                    aria-controls={open ? 'composition-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                >
                    <Edit/>
                </Button>
                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    placement="bottom-start"
                    transition
                    // disablePortal
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin:
                                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                            }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList
                                        autoFocusItem={open}
                                        id="composition-menu"
                                        aria-labelledby="composition-button"
                                        onKeyDown={handleListKeyDown}
                                    >
                                        {getItemList()}
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        // </Stack>
    );
}