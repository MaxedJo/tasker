import {List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import * as React from "react";

export default function TaskList(props) {
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
                props.tasks.map(task => (
                    <ListItem key={`item-${task}`}>
                        <ListItemButton>
                            <ListItemText primary={task.description} secondary={task.status}/>
                        </ListItemButton>
                    </ListItem>
                ))
            }
        </List>
    );
}