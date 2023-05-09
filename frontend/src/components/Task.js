import * as React from 'react';
import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Button, Paper} from "@mui/material";
import authToken from "../authToken";
import axios from "axios";


export default function Task() {
    const paperStyle = {width: "40%", position: "center"}
    const [description, setDescription] = useState('')
    const [tasks, setTasks] = useState([])
    const handleClick = (e) => {
        e.preventDefault()
        const task = {description}
        axios.post("http://localhost:8080/task/add", task
            , {headers: authToken()}
        ).then(() => console.log("ADDED"));
    }

    useEffect(() => {
        axios.get("http://localhost:8080/task/get", {headers: authToken()})
            .then(r => {
                setTasks(r.data)
                })
    },[])

    return (
        <>
        <Paper elevation={3} style={paperStyle}>
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <h1>Add Task</h1>
            <TextField value={description} onChange={(e) => setDescription(e.target.value) } id="description" label="Description" variant="standard" />
            <Button variant="contained" onClick={handleClick} >Create Task</Button>
        </Box>
        </Paper>
        <Paper elevation={3} style={paperStyle}>
            {
                tasks.map(task => (
                <Paper key={task.id} elevation={6}>
                    Id:{task.id}
                    Description:{task.description}
                </Paper>
            ))
            }
        </Paper>
    </>
    );
}
