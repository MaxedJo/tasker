import {List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import * as React from "react";

export default function UserList(props) {
    return (
        <List
            sx={{
                width: '100%',
                maxWidth: 800,
                bgcolor: 'background.paper',
                position: 'relative',
                ml: "auto",
                mr: "auto",
                overflow: 'auto',
                maxHeight: 300,
                '& ul': {padding: 0},
            }}
        >
            {
                props.users.map(user => (
                    <ListItem key={`item-${user}`}>
                        <ListItemButton>
                            <ListItemText primary={user.fio} secondary={user.username}/>
                        </ListItemButton>
                    </ListItem>
                ))
            }
        </List>
    );
}