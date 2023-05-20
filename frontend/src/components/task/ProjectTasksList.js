import * as React from 'react';
import TasksList from "./TasksList";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TaskCreate from "./TaskCreate";
import {addTask} from "../../api/client";
import Toolbar from "@mui/material/Toolbar";


export default function ProjectTasksList(props) {
    const [open, setOpen] = React.useState(false);
    const [tasks, setTasks] = React.useState(props.items);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAdd = task => {
        addTask(task).then(r => {
            setTasks([
                ...tasks,
                {...r.data}
            ]);
        });
        setOpen(false);
    }

    return (
        <>
            <Toolbar>
                <Button
                    startIcon={<AddIcon/>}
                    onClick={handleClickOpen}>
                    Поставить задачу
                </Button>
            </Toolbar>
            <TasksList items={tasks}/>
            <TaskCreate
                open={open}
                onClose={handleClose}
                projectId={props.projectId}
                onSave={handleAdd}
            />
        </>
    );
}