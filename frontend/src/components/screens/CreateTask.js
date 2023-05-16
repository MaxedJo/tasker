import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import * as React from "react";
import {useEffect, useState} from "react";
import {Button} from "@mui/material";
import Grid from "@mui/material/Grid";
import {useLoaderData, useNavigate} from "react-router-dom";
import axios from "axios";
import authToken from "../../authToken";
import Typography from "@mui/material/Typography";

export default function CreateTask(props) {
    const [task, setTask] = useState();
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
            description: data.get("description"),
            id: task ? task.id : null,
            project: load,
            owner: JSON.parse(localStorage.getItem("user")).id,
            status: data.get("status"),
            user: data.get("user")
        }
        axios
            .post("http://185.225.34.140:8080/task/add", taskFromData, {headers: authToken()})
            .then(r => {
                setTask(r.data);
                nav(-1);
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
                            label="Задача"
                            name="title"
                            autoComplete="title"
                            defaultValue={task ? task.title : ""}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            multiline
                            fullWidth
                            id="description"
                            label="Описание"
                            name="description"
                            autoComplete="description"
                            defaultValue={task ? task.description : ""}
                        />
                    </Grid>
                </Grid>
                <Button sx={{mt: 4}} variant="contained" type="submit">Сохранить</Button>
            </Box>
        </Box>

    );
}