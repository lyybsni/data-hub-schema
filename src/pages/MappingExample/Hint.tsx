import {List, ListItem} from "@mui/material";

export const Hint = () => {
    return <div>
        <List>
            <ListItem>To utilize the show case, you must finish at least one mapping in the previous page.</ListItem>
            <ListItem>You can put your example data in the text area, or upload a .csv file.</ListItem>
        </List>
    </div>
}