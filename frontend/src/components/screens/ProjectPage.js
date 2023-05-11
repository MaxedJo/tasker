import {useLoaderData} from "react-router-dom";
import {BottomNavigation, BottomNavigationAction, Box, Typography} from "@mui/material";
import React, {useState} from "react";
import UserList from "../ui/UserList";
import PersonIcon from "@mui/icons-material/Person";
import ListAltIcon from "@mui/icons-material/ListAlt";
import TaskList from "../ui/TaskList";
import DescriptionIcon from '@mui/icons-material/Description';


export default function ProjectPage(){
    const [value, setValue] = useState(0);
    const load = useLoaderData();
    const data = load.data;
    const renderAll = (state) =>{
        console.log(state)
        switch (state){
            case 0 :
                return <UserList users={data.members}/>
            case 1 :
                return <TaskList tasks={data.tasks}/>
            case 2:
                return <Typography mt={3} mb="auto">{data.description}</Typography>
        }
    }
    // console.log(load.data)
    return(
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
                    <BottomNavigationAction  label="Участники Проекта" icon={<PersonIcon />} />
                    <BottomNavigationAction  label="Задачи проекта" icon={<ListAltIcon />} />
                    <BottomNavigationAction  label="Описание проекта" icon={<DescriptionIcon />} />
                </BottomNavigation>
            </Box>
            {renderAll(value)}
        </Box>
    );
}