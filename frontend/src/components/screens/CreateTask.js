import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import * as React from "react";
import {useEffect, useState} from "react";
import {Button} from "@mui/material";
import Grid from "@mui/material/Grid";
import {Navigate, useLoaderData, useNavigate} from "react-router-dom";
import Typography from "@mui/material/Typography";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {addTask} from "../../api/client";

export default function CreateTask(props) {
    const [task, setTask] = useState();
    const [description, setDescription] = useState(task ? task.description : "");

    useEffect(() => {
        if (props) setTask(props.task);
    }, [])
    const load = useLoaderData();
    let nav = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const taskFromData = {
            title: data.get("title"),
            description: description,
            id: task ? task.id : null,
            project: load,
            owner: JSON.parse(localStorage.getItem("user")).id,
            status: data.get("status"),
            user: data.get("user")
        }
        addTask(taskFromData)
            .then(r => {
                setTask(r.data);
                nav(-1);
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
                 onSubmit={handleSubmit}
                 autoComplete="off">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="title"
                            label="Задача"
                            name="title"
                            autoComplete="title"
                            defaultValue={task ? task.title : ""}
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