import * as React from "react";
import {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {getProjectList} from "../../api/client";
import ProjectsList from "../projects/ProjectsList";
import {ButtonGroup} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {Navigate} from "react-router-dom";

export default function ProjectsListPage() {
    const [projects, setProjects] = useState([]);
    useEffect(() => {
        getProjectList()
            .then(response => setProjects(response.data));
    }, []);
    if (!localStorage.getItem("user")) {
        return <Navigate to="/login"/>;
    }
    return (
        <Box pt={10}>
            <Typography variant="h5">Ваши проекты</Typography>
            <ButtonGroup
                variant="outlined"
                aria-label="outlined primary button group"
                sx={{m: 2}}
            >
                <Button
                    startIcon={<AddIcon/>}
                    size="small"
                    href={"/projects/create"}>Создать Проект</Button>
            </ButtonGroup>
            <ProjectsList
                items={projects}/>
        </Box>
    );
}