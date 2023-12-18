import {List, ListItem} from "@mui/material";
import {HelpOutlineRounded} from "@mui/icons-material";
import {PopOver} from "../../components/Menu/PopOverText";
import React from "react";


export const Hint = (
    props: {
        article: string[]
    }
) => {
    const convert = (article: string[]) => {
        return article.map((item, idx) => {
            return <ListItem itemID={`${idx}`}>{item}</ListItem>
        })
    }
    return <PopOver baseText={<HelpOutlineRounded sx={{height: '16px', width: '16px'}}/>}
                    popoverText={<div>
                        <List>
                            {convert(props.article)}
                        </List>
                    </div>}/>
}