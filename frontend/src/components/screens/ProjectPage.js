import {Outlet, useLoaderData} from "react-router-dom";
import {BottomNavigation, BottomNavigationAction, Box, Typography} from "@mui/material";
import React, {useState} from "react";
import UserList from "../ui/UserList";
import PersonIcon from "@mui/icons-material/Person";
import ListAltIcon from "@mui/icons-material/ListAlt";
import TaskList from "../ui/TaskList";
import DescriptionIcon from '@mui/icons-material/Description';
import Button from "@mui/material/Button";
import CreateProject from "./CreateProject";


export default function ProjectPage() {
    const [value, setValue] = useState(4);
    const load = useLoaderData();
    const data = load.data;
    const handleEdit = () => {
        setValue(3)
    }
    const renderAll = (state) => {
        switch (state) {
            case 0 :
                return <UserList users={data.members} create/>
            case 1 :
                return <TaskList tasks={data.tasks} id={data.id} create={true}/>
            case 2:
                return <>
                    <Typography sx={{whiteSpace: 'pre-line'}} mt={3}>{data.description}</Typography>
                    <Button onClick={handleEdit}>Редактировать</Button>
                </>
            case 3:
                return <CreateProject project={data}/>
        }
    }
    return (
        <Box>
            <Typography mt={3} variant="h3">{data.title}</Typography>
            <Box mt={3}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                >
                    <BottomNavigationAction label="Участники Проекта" icon={<PersonIcon/>}/>
                    <BottomNavigationAction label="Задачи проекта" icon={<ListAltIcon/>}/>
                    <BottomNavigationAction label="Описание проекта" icon={<DescriptionIcon/>}/>
                </BottomNavigation>
            </Box>
            {renderAll(value)}
            <Outlet/>

        </Box>
    );
}