import {Outlet, useLoaderData, useNavigate} from "react-router-dom";
import {BottomNavigation, BottomNavigationAction, Box, ListItemText, Typography} from "@mui/material";
import React, {useState} from "react";
import PersonIcon from "@mui/icons-material/Person";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DescriptionIcon from '@mui/icons-material/Description';
import Button from "@mui/material/Button";
import CreateProject from "./CreateProject";
import {validateUser} from "../../utility";
import {deleteProject, leaveProject} from "../../api/client";
import parse from "html-react-parser";
import CompletitionProgress from "../ui/CompletitionProgress";
import ProjectTasksList from "../task/ProjectTasksList";
import ProjectUsersList from "../usres/ProjectUsresList";


const saveCurrent = id => localStorage.setItem('PROJECT_ACTIVE_TAB', id);
const getCurrent = () => localStorage.getItem('PROJECT_ACTIVE_TAB') || 1;

export default function ProjectPage() {
    const [value, setValue] = useState(getCurrent);
    const load = useLoaderData();
    const nav = useNavigate();
    const data = load.data;

    const leave = () => {
        leaveProject(data.id)
            .then(r => {
                nav("/projects");
            });
    }
    const handleEdit = () => {
        setValue(3)
    }
    const handleDelete = () => {
        deleteProject(data.id)
            .then(r => {
                nav("/projects");
            });
    }
    const renderAll = (state) => {
        switch (state) {
            case 0 :
                return <ProjectUsersList items={data.members} projectId={data.id} canDelete ownerId={data.owner.id}/>

            case 1 :
                return <ProjectTasksList items={data.tasks} projectId={data.id}/>
            case 2:
                return <>
                    <Typography sx={{whiteSpace: 'pre-line'}} ml="auto" mr="auto"
                                component="div"
                                className="tmx-description"
                                mb={2}>{parse(data.description)}</Typography>
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
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'inline'}}>
                <Typography mt={3} variant="h3">{data.title}</Typography>
                {data.activeTasks > 0 ?
                    <Box sx={{
                        ml: 3,
                        mt: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <CompletitionProgress
                            value={data.completedTasks / data.activeTasks * 100}/>
                        <ListItemText secondary={data.completedTasks + "/" + data.activeTasks}/>
                    </Box> : <></>}
            </Box>
            <Box mt={3}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        saveCurrent(newValue);
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