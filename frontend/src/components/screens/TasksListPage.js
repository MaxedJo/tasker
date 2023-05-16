import axios from "axios";
import authToken from "../../authToken";
import * as React from "react";
import {useEffect, useState} from "react";
import {Grid, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import TaskList from "../ui/TaskList";

export default function TasksListPage() {
    const [created, setCreated] = useState([]);
    const [assigned, setAssigned] = useState([]);
    useEffect(() => {
        axios
            .get("http://185.225.34.140:8080/user-api/created-tasks", {headers: authToken()})
            .then(response => setCreated(response.data));
        axios
            .get("http://185.225.34.140:8080/user-api/assigned-tasks", {headers: authToken()})
            .then(response => setAssigned(response.data));
    }, []);
    return (
        <Box position="center" sx={{width: '100%', bgcolor: 'background.paper'}}>
            <nav>
                <Grid container>
                    <Grid item mt={4} ml="auto" mr="auto">
                        <Typography variant="h5" mb={4}>Созданные задачи</Typography>
                        <TaskList tasks={created}/>
                    </Grid>
                    <Grid item mt={4} mr="auto">
                        <Typography variant="h5" mb={4}>Назначенные задачи</Typography>
                        <TaskList tasks={assigned}/>
                    </Grid>
                </Grid>
            </nav>
        </Box>
    );
}