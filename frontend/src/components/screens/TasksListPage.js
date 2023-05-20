import * as React from "react";
import {useEffect, useState} from "react";
import {Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {getTaskAssigned, getTaskCreated} from "../../api/client";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import TasksList from "../task/TasksList";
import {Navigate} from "react-router-dom";


export default function TasksListPage() {
    const [created, setCreated] = useState([]);
    const [assigned, setAssigned] = useState([]);
    const [tab, setTab] = useState('created');
    const handleTabChange = (event, newValue) => {
        setTab(newValue);
    };

    useEffect(() => {
        getTaskCreated()
            .then(response => setCreated(response.data));
        getTaskAssigned()
            .then(response => setAssigned(response.data));
    }, []);
    if (!localStorage.getItem("user")) {
        return <Navigate to="/login"/>;
    }
    return (
        <Box position="center" sx={{width: '100%', bgcolor: 'background.paper'}}>
            <Typography variant="h2" mb={4}>Задачи</Typography>
            <TabContext value={tab}>
                <Box ml="auto" mr="auto" maxWidth="50vh" sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <TabList onChange={handleTabChange}>
                        <Tab label="Созданные" value="created"/>
                        <Tab label="Назначенные" value="assigned"/>
                    </TabList>
                </Box>
                <TabPanel value="created">
                    <TasksList items={created}/>
                </TabPanel>
                <TabPanel value="assigned"><TasksList items={assigned}/></TabPanel>
            </TabContext>
        </Box>
    );
}