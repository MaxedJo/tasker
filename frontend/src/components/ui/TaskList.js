import {List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import * as React from "react";
import {fixStatus} from "../../utility";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function TaskList(props) {
    return (
        <Box>
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
                        <ListItem key={`item-${task.id}`}>
                            <ListItemButton href={"/tasks/" + task.id}>
                                <ListItemText primary={task.description} secondary={fixStatus(task.status)}/>
                            </ListItemButton>
                        </ListItem>
                    ))
                }
            </List>
            {props.create ? <Button href={"/projects/" + props.id + "/task"}>Добавить задачу</Button> : <></>}
        </Box>
    );
}