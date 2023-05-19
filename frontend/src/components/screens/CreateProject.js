import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import * as React from "react";
import {Button} from "@mui/material";
import Grid from "@mui/material/Grid";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import authToken from "../../authToken";
import Typography from "@mui/material/Typography";
import {updateProject} from "../../api/client";

export default function CreateProject(props) {
    let nav = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const projectFromData = {
            title: data.get("title"),
            description: data.get("description"),
            id: props.project ? props.project.id : null
        }
        //axios            .post("http://localhost:8080/project/edit", projectFromData, {headers: authToken()})
        updateProject(projectFromData)
            .then(r => {
                nav("/projects/" + r.data.id);
            });
    }
    return (
        <Box>
            <Typography variant="h3" mb={4} mt={4}></Typography>
            <Box component="form"
                 sx={{
                     '& > :not(style)': {m: 1, maxWidth: '90ch'},
                     display: 'flex',
                     flexDirection: 'column',
                     alignItems: 'center',
                 }}
                 noValidate
                 onSubmit={handleSubmit}
                 autoComplete="off">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="title"
                            label="Название проекта"
                            name="title"
                            autoComplete="title"
                            defaultValue={props.project ? props.project.title : ""}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            multiline
                            fullWidth
                            id="description"
                            label="Описание проекта"
                            name="description"
                            autoComplete="description"
                            defaultValue={props.project ? props.project.description : ""}
                        />
                    </Grid>
                </Grid>
                <Button sx={{mt: 4}} variant="contained" type="submit">Сохранить</Button>
            </Box>
        </Box>

    );
}