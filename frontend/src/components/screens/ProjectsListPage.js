import axios from "axios";
import authToken from "../../authToken";
import * as React from "react";
import {useEffect, useState} from "react";
import {List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {limitedString} from "../../utility";
import Button from "@mui/material/Button";
import {getProjectList} from "../../api/client";

export default function ProjectsListPage() {
    const paperStyle = {width: "40%", position: "center"}
    const [projects, setProjects] = useState([]);
    useEffect(() => {
        getProjectList()
            .then(response => setProjects(response.data));
    }, []);
    return (
        <Box pt={10}>
            <Typography variant="h5">Ваши проекты</Typography>
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
                    projects.map(project => (
                        <ListItem key={project.id} disablePadding>
                            <ListItemButton href={'/projects/' + project.id}>
                                <ListItemText primary={project.title} secondary=
                                    {limitedString(project.description, 30)}/>
                            </ListItemButton>
                        </ListItem>
                    ))
                }
            </List>
            <Button href={"/projects/create"}>Создать Проект</Button>
            </Box>
    );
}