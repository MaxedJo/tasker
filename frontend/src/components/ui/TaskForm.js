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
import {getProjectMembers, updateTask} from "../../api/client";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function TaskForm(props) {
    const [users, setUsers] = useState([]);
    const [deadline, setDeadline] = useState(dayjs(props.task.deadline));
    const [description, setDescription] = useState(props.task ? props.task.description : "");
    let nav = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const taskFromData = {
            title: data.get("title"),
            description: description,
            status: props.task.status,
            id: props.task.id,
            user: data.get("user"),
            deadline: deadline.isValid() ? deadline.format('YYYY-MM-DD') : null,
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
    }, []);

    return (
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
                        fullWidth
                        select
                        id="user"
                        label="Исполнитель"
                        name="user"
                        autoComplete="user"
                        defaultValue={props.task.user ? props.task.user : 0}
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
                <Grid item xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker defaultValue={dayjs(props.task.deadline)} onChange={setDeadline}
                                    label="Срок выполнения"/>
                    </LocalizationProvider>
                </Grid>
            </Grid>
            <Button sx={{mt: 4}} variant="contained" type="submit">Сохранить</Button>
        </Box>
    );
}