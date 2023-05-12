import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import * as React from "react";
import {useEffect, useState} from "react";
import {Button} from "@mui/material";
import Grid from "@mui/material/Grid";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import authToken from "../../authToken";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

const statuses = [
    {
        value: 'OPENED',
        label: 'Открыта',
    },
    {
        value: 'WORKING',
        label: 'В работе',
    },
    {
        value: 'TESTING',
        label: 'На тестировании',
    },
    {
        value: 'CLOSED',
        label: 'Закрыта',
    },
    {
        value: 'ARCHIVED',
        label: 'В архиве',
    },
];
export default function TaskForm(props) {
    console.log(props.task)
    const [users, setUsers] = useState([]);
    let nav = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const taskFromData = {
            title: data.get("title"),
            description: data.get("description"),
            status: data.get("status"),
            id: props.task.id,
            user: data.get("user")
        }
        axios
            .post("http://localhost:8080/task/edit", taskFromData, {headers: authToken()})
            .then(r => {
                window.location.reload();
            });
    }
    useEffect(() => {
        axios.get("http://localhost:8080/project/" + props.task.project + "/members", {headers: authToken()})
            .then(r => {
                setUsers(r.data);
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
                    <TextField
                        required
                        multiline
                        fullWidth
                        id="description"
                        label="Описание"
                        name="description"
                        autoComplete="description"
                        defaultValue={props.task.description}
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
                            <MenuItem key={option.value} value={option.value}>
                                <Typography variant="h7">{option.label}</Typography>
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