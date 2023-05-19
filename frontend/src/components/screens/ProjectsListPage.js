import * as React from "react";
import {useEffect, useState} from "react";
import {List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {getProjectList} from "../../api/client";
import CompletitionProgress from "../ui/CompletitionProgress";

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
                                <ListItemText primary={project.title}/>
                                {project.activeTasks > 0 ?
                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <CompletitionProgress
                                            value={project.completedTasks / project.activeTasks * 100}/>
                                        <ListItemText secondary={project.completedTasks + "/" + project.activeTasks}/>
                                    </Box> : <></>}
                            </ListItemButton>
                        </ListItem>
                    ))
                }
            </List>
            <Button href={"/projects/create"}>Создать Проект</Button>
        </Box>
    );
}