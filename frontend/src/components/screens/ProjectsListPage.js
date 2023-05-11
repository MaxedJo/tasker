import axios from "axios";
import authToken from "../../authToken";
import * as React from "react";
import {useEffect, useState} from "react";
import {List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import Box from "@mui/material/Box";
import limitedString from "../../utility";

export default function ProjectsListPage() {
    const paperStyle = {width: "40%", position: "center"}
    const [projects, setProjects] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:8080/project/all", {headers: authToken()})
            .then(response => setProjects(response.data));
    }, []);
    return (
            <Box position="center" sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                <nav aria-label="main mailbox folders">
                    <List sx={{ml: "auto", mr: "auto"}}>
                        {
                            projects.map(project => (
                                <ListItem key={project.id} disablePadding>
                                    <ListItemButton href={'/projects/'+project.id} >
                                        <ListItemText primary={project.title} secondary=
                                            {limitedString(project.description,30)}/>
                                    </ListItemButton>
                                </ListItem>
                            ))
                        }
                    </List>
                </nav>
            </Box>
    );
}