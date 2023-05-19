import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import * as React from "react";
import {useEffect, useState} from "react";
import {Button} from "@mui/material";
import Grid from "@mui/material/Grid";
import {useNavigate} from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './TaskForm.css';
import {getProjectMembers, getStatuses, updateTask} from "../../api/client";

export default function TaskForm(props) {
    const [users, setUsers] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [description, setDescription] = useState(props.task ? props.task.description : "");
    let nav = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const taskFromData = {
            title: data.get("title"),
            description: description,
            status: data.get("status"),
            id: props.task.id,
            user: data.get("user")
        }
        updateTask(taskFromData)
            .then(r => {
                window.location.reload();
            });
    }
    useEffect(() => {
        getProjectMembers(props.task.project)
            .then(r => {
                setUsers(r.data);
            });
        console.log(111)
        getStatuses(props.task.id)
            .then(r => {
                setStatuses(r.data);
            })
    }, []);

    return (
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
                        defaultValue={props.task.title}
                    />
                </Grid>
                <Grid item xs={12}>
                    <ReactQuill theme="snow" value={description} onChange={setDescription}
                                placeholder="Описание задачи"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        select
                        id="status"
                        label="Статус задачи"
                        name="status"
                        autoComplete="status"
                        defaultValue={props.task.status}
                    >
                        {statuses.map((option) => (
                            <MenuItem key={option.status} value={option.status}>
                                <Typography variant="h7">{option.description}</Typography>
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        select
                        id="user"
                        label="Испольнитель"
                        name="user"
                        autoComplete="user"
                        defaultValue={props.task.user}
                    >
                        <MenuItem key={0} value={0}>
                            <Typography variant="h7"></Typography>
                        </MenuItem>
                        {users.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                <Typography variant="h7">{option.fio} {option.username} {option.profession}</Typography>
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
            </Grid>
            <Button sx={{mt: 4}} variant="contained" type="submit">Сохранить</Button>
        </Box>
    );
}