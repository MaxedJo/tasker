import {Outlet, useLoaderData, useNavigate} from "react-router-dom";
import {BottomNavigation, BottomNavigationAction, Box, Typography} from "@mui/material";
import React, {useState} from "react";
import UserList from "../ui/UserList";
import PersonIcon from "@mui/icons-material/Person";
import ListAltIcon from "@mui/icons-material/ListAlt";
import TaskList from "../ui/TaskList";
import DescriptionIcon from '@mui/icons-material/Description';
import Button from "@mui/material/Button";
import CreateProject from "./CreateProject";
import {validateUser} from "../../utility";
import axios from "axios";
import authToken from "../../authToken";


export default function ProjectPage() {
    const [value, setValue] = useState(4);
    const load = useLoaderData();
    const nav = useNavigate();
    const data = load.data;
    console.log(data)
    const leave = () => {
        axios.get("http://localhost:8080/project/" + data.id + "/leave", {headers: authToken()})
            .then(r => {
                nav("/projects");
            });
    }
    const handleEdit = () => {
        setValue(3)
    }
    const handleDelete = () => {
        axios.get("http://localhost:8080/project/" + data.id + "/delete", {headers: authToken()})
            .then(r => {
                nav("/projects");
            });
    }
    const renderAll = (state) => {
        switch (state) {
            case 0 :
                return <UserList users={data.members} create project={data.id} delete owner={data.owner.id}/>
            case 1 :
                return <TaskList tasks={data.tasks} id={data.id} create={true}/>
            case 2:
                return <>
                    <Typography sx={{whiteSpace: 'pre-line'}} maxWidth={800} ml="auto" mr="auto"
                                mt={3}>{data.description}</Typography>
                    {validateUser(data.owner.id, <Button onClick={handleEdit}>Редактировать</Button>)}
                    {validateUser(data.owner.id, <Button onClick={handleDelete}>Удалить</Button>)}
                    {validateUser(data.owner.id, <></>, <Button onClick={leave}>Покинуть</Button>)}

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