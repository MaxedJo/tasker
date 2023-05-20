import * as React from "react";
import {useState} from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {Button} from "@mui/material";
import Grid from "@mui/material/Grid";
import {Navigate, useNavigate} from "react-router-dom";
import Typography from "@mui/material/Typography";
import {updateProject} from "../../api/client";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function CreateProject(props) {
    let nav = useNavigate();
    const [description, setDescription] = useState(props.project ? props.project.description : "");

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const projectFromData = {
            title: data.get("title"),
            description: description,
            id: props.project ? props.project.id : null
        }
        updateProject(projectFromData)
            .then(r => {
                nav("/projects/" + r.data.id);
            });
    }
    if (!localStorage.getItem("user")) {
        return <Navigate to="/login"/>;
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
                        <ReactQuill theme="snow" value={description} onChange={setDescription}/>
                    </Grid>
                </Grid>
                <Button sx={{mt: 4}} variant="contained" type="submit">Сохранить</Button>
            </Box>
        </Box>

    );
}